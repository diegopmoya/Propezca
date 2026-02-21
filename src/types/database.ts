// Tipos del modelo de datos de Propezca Control
// Generados manualmente basados en el esquema SQL del producto

export type CostStatus = "complete" | "partial" | "missing";
export type MatchStatus = "exact" | "fuzzy" | "manual" | "unmatched";
export type AlertType =
  | "missing_cost"
  | "low_stock"
  | "overstock"
  | "no_sku"
  | "data_gap"
  | "duplicate_seller"
  | "negative_margin"
  | "slow_moving";
export type Severity = "critical" | "high" | "medium" | "low";
export type AlertStatus = "open" | "acknowledged" | "resolved" | "dismissed";
export type IncidentStatus = "open" | "investigating" | "resolved" | "accepted";
export type UserRole = "owner" | "admin" | "manager" | "operator" | "viewer";
export type CostType = "last" | "average" | "manual";
export type UploadStatus = "uploaded" | "processing" | "processed" | "failed" | "archived";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  rut?: string;
  business_type?: string;
  plan: string;
  settings: Record<string, unknown>;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  tenant_id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  preferences: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  tenant_id: string;
  name: string;
  parent_id?: string;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  tenant_id: string;
  sku?: string;
  gtin?: string;
  name: string;
  normalized_name: string;
  brand?: string;
  category_id?: string;
  current_cost?: number;
  sale_price?: number;
  margin_pct?: number;
  cost_status: CostStatus;
  min_stock?: number;
  max_stock?: number;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  // Relaciones opcionales
  category?: Category;
  aliases?: ProductAlias[];
}

export interface ProductAlias {
  id: string;
  tenant_id: string;
  product_id: string;
  alias_name: string;
  source: string;
  is_approved: boolean;
  created_at: string;
}

export interface CostHistory {
  id: string;
  tenant_id: string;
  product_id: string;
  cost: number;
  cost_type: CostType;
  source?: string;
  effective_date: string;
  created_at: string;
}

export interface SaleLine {
  id: string;
  tenant_id: string;
  upload_id?: string;
  sale_date: string;
  product_raw_name: string;
  product_id?: string;
  match_status: MatchStatus;
  quantity: number;
  unit_price?: number;
  total_amount?: number;
  seller_name?: string;
  payment_method?: string;
  ticket_number?: string;
  raw_data: Record<string, unknown>;
  created_at: string;
}

export interface StockSnapshot {
  id: string;
  tenant_id: string;
  product_id: string;
  upload_id?: string;
  snapshot_date: string;
  quantity: number;
  unit_cost?: number;
  location: string;
  created_at: string;
}

export interface Alert {
  id: string;
  tenant_id: string;
  alert_type: AlertType;
  severity: Severity;
  title: string;
  description?: string;
  resource_type?: string;
  resource_id?: string;
  status: AlertStatus;
  created_at: string;
  resolved_at?: string;
}

export interface DataQualityIncident {
  id: string;
  tenant_id: string;
  incident_type: string;
  severity: Severity;
  description: string;
  affected_records?: number;
  status: IncidentStatus;
  created_at: string;
  resolved_at?: string;
}

export interface FileUpload {
  id: string;
  tenant_id: string;
  uploaded_by: string;
  bucket: string;
  file_path: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  metadata: Record<string, unknown>;
  status: UploadStatus;
  created_at: string;
}

export interface AuditLog {
  id: string;
  tenant_id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
