-- Seed: Tenant Propezca + Admin user
-- El usuario iacraft@iacraftspa.com ya existe en auth.users (registrado manualmente)

-- Crear tenant
INSERT INTO tenants (id, slug, name, business_type, plan, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'propezca',
  'Propezca SpA',
  'retail',
  'professional',
  true
) ON CONFLICT (id) DO NOTHING;

-- Vincular usuario como owner/admin
-- Usa subquery para obtener el UUID dinámicamente
INSERT INTO profiles (id, tenant_id, full_name, role, is_active)
SELECT
  u.id,
  '00000000-0000-0000-0000-000000000001',
  COALESCE(u.raw_user_meta_data->>'full_name', 'IACraft Admin'),
  'owner',
  true
FROM auth.users u
WHERE u.email = 'iacraft@iacraftspa.com'
ON CONFLICT (id) DO NOTHING;

-- Crear config de loyalty para el tenant
INSERT INTO loyalty_config (tenant_id, points_per_1000, min_redeem, max_redeem_pct, point_value_clp, expiry_months)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  10, 500, 50, 1.00, 12
) ON CONFLICT (tenant_id) DO NOTHING;
