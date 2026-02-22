-- Sprint 1: Ecommerce + Cuenta + Sistema de Puntos
-- Tablas para pedidos, direcciones, programa de fidelización

-- Direcciones de envío del cliente
CREATE TABLE IF NOT EXISTS customer_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  label TEXT DEFAULT 'Casa',
  recipient_name TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  postal_code TEXT,
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled'
  )),
  shipping_address_id UUID REFERENCES customer_addresses(id),
  shipping_method TEXT DEFAULT 'pickup' CHECK (shipping_method IN ('pickup', 'delivery')),
  shipping_cost DECIMAL(12,2) DEFAULT 0,
  subtotal DECIMAL(12,2) NOT NULL,
  points_discount DECIMAL(12,2) DEFAULT 0,
  points_used INTEGER DEFAULT 0,
  total DECIMAL(12,2) NOT NULL,
  points_earned INTEGER DEFAULT 0,
  payment_method TEXT DEFAULT 'transfer',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'failed', 'refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Líneas de pedido
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_sku TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ledger de puntos (append-only, cada movimiento es un registro)
CREATE TABLE IF NOT EXISTS points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  order_id UUID REFERENCES orders(id),
  movement_type TEXT NOT NULL CHECK (movement_type IN (
    'earn', 'redeem', 'expire', 'adjust', 'bonus', 'refund'
  )),
  points INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT NOT NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saldo de puntos por usuario (vista materializada para performance)
CREATE TABLE IF NOT EXISTS points_balance (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  current_balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_redeemed INTEGER DEFAULT 0,
  total_expired INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Configuración de programa de fidelización
CREATE TABLE IF NOT EXISTS loyalty_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID UNIQUE NOT NULL REFERENCES tenants(id),
  points_per_1000 INTEGER DEFAULT 10,
  bonus_categories JSONB DEFAULT '[]',
  min_redeem INTEGER DEFAULT 500,
  max_redeem_pct INTEGER DEFAULT 50,
  point_value_clp DECIMAL(5,2) DEFAULT 1.00,
  expiry_months INTEGER DEFAULT 12,
  tiers JSONB DEFAULT '[
    {"name":"bronze","min_points":0,"multiplier":1},
    {"name":"silver","min_points":5000,"multiplier":1.5},
    {"name":"gold","min_points":15000,"multiplier":2}
  ]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Agregar points_value a products (puntos que otorga cada producto)
ALTER TABLE products ADD COLUMN IF NOT EXISTS points_value INTEGER DEFAULT 0;

-- Índices
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_tenant ON orders(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_points_ledger_user ON points_ledger(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_user ON customer_addresses(user_id);

-- RLS
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_balance ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_config ENABLE ROW LEVEL SECURITY;

-- Policies: el usuario solo ve sus propios datos
CREATE POLICY "own_addresses" ON customer_addresses USING (user_id = auth.uid());
CREATE POLICY "own_orders" ON orders USING (user_id = auth.uid());
CREATE POLICY "own_order_items" ON order_items USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);
CREATE POLICY "own_points" ON points_ledger USING (user_id = auth.uid());
CREATE POLICY "own_balance" ON points_balance USING (user_id = auth.uid());
CREATE POLICY "tenant_loyalty_config" ON loyalty_config USING (
  tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
);
