-- Migración inicial: esquema Propezca Control
-- Ejecutar en Supabase SQL Editor

-- Tenants (empresas)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  rut TEXT,
  business_type TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'professional', 'enterprise')),
  settings JSONB DEFAULT '{}',
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (extiende auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'manager', 'operator', 'viewer')),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- File uploads
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  bucket TEXT NOT NULL,
  file_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'uploaded' CHECK (status IN ('uploaded', 'processing', 'processed', 'failed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Categorías de producto (jerarquía)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Maestro de Productos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  sku TEXT,
  gtin TEXT,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  brand TEXT,
  category_id UUID REFERENCES categories(id),
  current_cost DECIMAL(12,2),
  sale_price DECIMAL(12,2),
  margin_pct DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN sale_price > 0 AND current_cost > 0
      THEN ROUND(((sale_price - current_cost) / sale_price) * 100, 2)
      ELSE NULL END
  ) STORED,
  cost_status TEXT DEFAULT 'missing' CHECK (cost_status IN ('complete', 'partial', 'missing')),
  min_stock INTEGER,
  max_stock INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Alias / Sinónimos de producto
CREATE TABLE IF NOT EXISTS product_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  product_id UUID NOT NULL REFERENCES products(id),
  alias_name TEXT NOT NULL,
  source TEXT DEFAULT 'manual',
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Historial de costos
CREATE TABLE IF NOT EXISTS cost_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  product_id UUID NOT NULL REFERENCES products(id),
  cost DECIMAL(12,2) NOT NULL,
  cost_type TEXT DEFAULT 'last' CHECK (cost_type IN ('last', 'average', 'manual')),
  source TEXT,
  effective_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Líneas de venta
CREATE TABLE IF NOT EXISTS sale_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  upload_id UUID REFERENCES file_uploads(id),
  sale_date DATE NOT NULL,
  product_raw_name TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  match_status TEXT DEFAULT 'unmatched' CHECK (match_status IN ('exact', 'fuzzy', 'manual', 'unmatched')),
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(12,2),
  total_amount DECIMAL(12,2),
  seller_name TEXT,
  payment_method TEXT,
  ticket_number TEXT,
  raw_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Snapshots de inventario
CREATE TABLE IF NOT EXISTS stock_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  product_id UUID NOT NULL REFERENCES products(id),
  upload_id UUID REFERENCES file_uploads(id),
  snapshot_date DATE NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_cost DECIMAL(12,2),
  location TEXT DEFAULT 'tienda',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Alertas del sistema
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  alert_type TEXT NOT NULL CHECK (alert_type IN (
    'missing_cost', 'low_stock', 'overstock', 'no_sku',
    'data_gap', 'duplicate_seller', 'negative_margin', 'slow_moving'
  )),
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT,
  resource_id UUID,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Incidentes de calidad de datos
CREATE TABLE IF NOT EXISTS data_quality_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  incident_type TEXT NOT NULL,
  severity TEXT DEFAULT 'medium',
  description TEXT NOT NULL,
  affected_records INTEGER,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'accepted')),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Audit logs (append-only)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_products_tenant ON products(tenant_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(tenant_id, category_id);
CREATE INDEX IF NOT EXISTS idx_sale_lines_tenant_date ON sale_lines(tenant_id, sale_date DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_tenant_status ON alerts(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_date ON audit_logs(tenant_id, created_at DESC);

-- RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_quality_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies de aislamiento por tenant
CREATE POLICY "tenant_isolation" ON profiles USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON categories USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON products USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON product_aliases USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON cost_history USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON sale_lines USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON stock_snapshots USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON alerts USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON data_quality_incidents USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "tenant_isolation" ON file_uploads USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

-- Audit logs: insert y read para admins
CREATE POLICY "audit_logs_insert" ON audit_logs FOR INSERT WITH CHECK (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "audit_logs_read_admin" ON audit_logs FOR SELECT USING (
  tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('owner', 'admin')
);
