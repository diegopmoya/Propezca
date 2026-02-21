// Datos demo para Propezca Control MVP
// 30 productos, 5 categorías, 100 líneas de venta, 10 alertas
import type {
  Product,
  Category,
  Alert,
  SaleLine,
  DataQualityIncident,
  FileUpload,
} from "@/types/database";

const TENANT_ID = "00000000-0000-0000-0000-000000000001";

// --- CATEGORÍAS ---
export const demoCategories: Category[] = [
  {
    id: "cat-01",
    tenant_id: TENANT_ID,
    name: "Cañas",
    sort_order: 1,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "cat-02",
    tenant_id: TENANT_ID,
    name: "Carretes",
    sort_order: 2,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "cat-03",
    tenant_id: TENANT_ID,
    name: "Señuelos",
    sort_order: 3,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "cat-04",
    tenant_id: TENANT_ID,
    name: "Líneas",
    sort_order: 4,
    created_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "cat-05",
    tenant_id: TENANT_ID,
    name: "Accesorios",
    sort_order: 5,
    created_at: "2025-01-01T00:00:00Z",
  },
];

// --- PRODUCTOS (30 total: 15 con costo, 15 sin costo) ---
export const demoProducts: Product[] = [
  // === CON COSTO (15) ===
  {
    id: "prod-01", tenant_id: TENANT_ID, sku: "CAN-001", name: "Caña Telescópica Mar 3.6m",
    normalized_name: "cana telescopica mar 3.6m", brand: "Kunnan", category_id: "cat-01",
    current_cost: 12500, sale_price: 24990, margin_pct: 49.98, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-01-15T00:00:00Z", updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "prod-02", tenant_id: TENANT_ID, sku: "CAN-002", name: "Caña Spinning Río 2.1m",
    normalized_name: "cana spinning rio 2.1m", brand: "Shakespeare", category_id: "cat-01",
    current_cost: 8900, sale_price: 18990, margin_pct: 53.13, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-01-15T00:00:00Z", updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "prod-03", tenant_id: TENANT_ID, sku: "CAR-001", name: "Carrete Frontal 4000",
    normalized_name: "carrete frontal 4000", brand: "Shimano", category_id: "cat-02",
    current_cost: 15000, sale_price: 32990, margin_pct: 54.53, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-01-15T00:00:00Z", updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "prod-04", tenant_id: TENANT_ID, sku: "CAR-002", name: "Carrete Baitcasting BC200",
    normalized_name: "carrete baitcasting bc200", brand: "Abu Garcia", category_id: "cat-02",
    current_cost: 22000, sale_price: 45990, margin_pct: 52.16, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-01-15T00:00:00Z", updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "prod-05", tenant_id: TENANT_ID, sku: "SEN-001", name: "Cucharilla Ondulante 7g Plata",
    normalized_name: "cucharilla ondulante 7g plata", brand: "Blue Fox", category_id: "cat-03",
    current_cost: 2200, sale_price: 5990, margin_pct: 63.27, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-01T00:00:00Z", updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-06", tenant_id: TENANT_ID, sku: "SEN-002", name: "Señuelo Minnow 9cm Trucha",
    normalized_name: "senuelo minnow 9cm trucha", brand: "Rapala", category_id: "cat-03",
    current_cost: 3500, sale_price: 8990, margin_pct: 61.07, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-01T00:00:00Z", updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-07", tenant_id: TENANT_ID, sku: "SEN-003", name: "Caballito Pokee 5cm",
    normalized_name: "caballito pokee 5cm", brand: "Pokee", category_id: "cat-03",
    current_cost: 2500, sale_price: 5990, margin_pct: 58.26, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-01T00:00:00Z", updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-08", tenant_id: TENANT_ID, sku: "SEN-004", name: "Caballito Pokee 7cm",
    normalized_name: "caballito pokee 7cm", brand: "Pokee", category_id: "cat-03",
    current_cost: 3000, sale_price: 6990, margin_pct: 57.08, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-01T00:00:00Z", updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-09", tenant_id: TENANT_ID, sku: "LIN-001", name: "Línea Monofilamento 0.30mm 100m",
    normalized_name: "linea monofilamento 0.30mm 100m", brand: "Sufix", category_id: "cat-04",
    current_cost: 1800, sale_price: 4990, margin_pct: 63.93, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-10T00:00:00Z", updated_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "prod-10", tenant_id: TENANT_ID, sku: "LIN-002", name: "Multifilamento PE 0.20mm 150m",
    normalized_name: "multifilamento pe 0.20mm 150m", brand: "Power Pro", category_id: "cat-04",
    current_cost: 8500, sale_price: 19990, margin_pct: 57.48, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-10T00:00:00Z", updated_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "prod-11", tenant_id: TENANT_ID, sku: "LIN-003", name: "Fluorocarbono 0.25mm 50m",
    normalized_name: "fluorocarbono 0.25mm 50m", brand: "Seaguar", category_id: "cat-04",
    current_cost: 5500, sale_price: 12990, margin_pct: 57.66, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-02-10T00:00:00Z", updated_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "prod-12", tenant_id: TENANT_ID, sku: "ACC-001", name: "Caja de Señuelos Grande",
    normalized_name: "caja de senuelos grande", brand: "Plano", category_id: "cat-05",
    current_cost: 4500, sale_price: 9990, margin_pct: 54.95, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "prod-13", tenant_id: TENANT_ID, sku: "ACC-002", name: "Red de Pesca Telescópica",
    normalized_name: "red de pesca telescopica", brand: "Frabill", category_id: "cat-05",
    current_cost: 6000, sale_price: 14990, margin_pct: 59.97, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "prod-14", tenant_id: TENANT_ID, sku: "CAN-003", name: "Caña Surfcasting 4.2m",
    normalized_name: "cana surfcasting 4.2m", brand: "Daiwa", category_id: "cat-01",
    current_cost: 18000, sale_price: 39990, margin_pct: 54.99, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "prod-15", tenant_id: TENANT_ID, sku: "CAR-003", name: "Carrete Horizontal 6000",
    normalized_name: "carrete horizontal 6000", brand: "Penn", category_id: "cat-02",
    current_cost: 25000, sale_price: 54990, margin_pct: 54.54, cost_status: "complete",
    is_active: true, metadata: {}, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z",
  },
  // === SIN COSTO (15) ===
  {
    id: "prod-16", tenant_id: TENANT_ID, name: "Jig Head 1/4oz Pack x5",
    normalized_name: "jig head 1/4oz pack x5", brand: "Owner", category_id: "cat-03",
    sale_price: 4990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-01-20T00:00:00Z", updated_at: "2025-01-20T00:00:00Z",
  },
  {
    id: "prod-17", tenant_id: TENANT_ID, name: "Vinilo Curly Tail 3\" Pack x10",
    normalized_name: "vinilo curly tail 3 pack x10", brand: "Berkley", category_id: "cat-03",
    sale_price: 3990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-01-20T00:00:00Z", updated_at: "2025-01-20T00:00:00Z",
  },
  {
    id: "prod-18", tenant_id: TENANT_ID, sku: "SEN-005", name: "Señuelo Popper 12cm",
    normalized_name: "senuelo popper 12cm", brand: "Yo-Zuri", category_id: "cat-03",
    sale_price: 11990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-01-25T00:00:00Z", updated_at: "2025-01-25T00:00:00Z",
  },
  {
    id: "prod-19", tenant_id: TENANT_ID, name: "Anzuelo Circular 5/0 Pack x10",
    normalized_name: "anzuelo circular 5/0 pack x10", brand: "Mustad", category_id: "cat-05",
    sale_price: 5990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-01T00:00:00Z", updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "prod-20", tenant_id: TENANT_ID, name: "Línea Nano 0.18mm 100m",
    normalized_name: "linea nano 0.18mm 100m", brand: "Berkley", category_id: "cat-04",
    sale_price: 8990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-05T00:00:00Z", updated_at: "2025-02-05T00:00:00Z",
  },
  {
    id: "prod-21", tenant_id: TENANT_ID, name: "Wader Neopreno 4mm Talla 42",
    normalized_name: "wader neopreno 4mm talla 42", brand: "Caster", category_id: "cat-05",
    sale_price: 79990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-10T00:00:00Z", updated_at: "2025-02-10T00:00:00Z",
  },
  {
    id: "prod-22", tenant_id: TENANT_ID, name: "Kit Pesca con Mosca Iniciación",
    normalized_name: "kit pesca con mosca iniciacion", brand: "Redington", category_id: "cat-01",
    sale_price: 89990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-15T00:00:00Z", updated_at: "2025-02-15T00:00:00Z",
  },
  {
    id: "prod-23", tenant_id: TENANT_ID, name: "Cuchillo Filetero 7\"",
    normalized_name: "cuchillo filetero 7", brand: "Rapala", category_id: "cat-05",
    sale_price: 15990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-20T00:00:00Z", updated_at: "2025-02-20T00:00:00Z",
  },
  {
    id: "prod-24", tenant_id: TENANT_ID, name: "Postones 5.5mm Lata x500",
    normalized_name: "postones 5.5mm lata x500", brand: "Gamo", category_id: "cat-05",
    sale_price: 7990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-02-25T00:00:00Z", updated_at: "2025-02-25T00:00:00Z",
  },
  {
    id: "prod-25", tenant_id: TENANT_ID, name: "Carpa Camping 4 Personas",
    normalized_name: "carpa camping 4 personas", brand: "National Geographic", category_id: "cat-05",
    sale_price: 89990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "prod-26", tenant_id: TENANT_ID, name: "Saco de Dormir -5°C",
    normalized_name: "saco de dormir -5c", brand: "Doite", category_id: "cat-05",
    sale_price: 49990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-05T00:00:00Z", updated_at: "2025-03-05T00:00:00Z",
  },
  {
    id: "prod-27", tenant_id: TENANT_ID, name: "Caña Fly 9' #5",
    normalized_name: "cana fly 9 5", brand: "Redington", category_id: "cat-01",
    sale_price: 129990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-10T00:00:00Z", updated_at: "2025-03-10T00:00:00Z",
  },
  {
    id: "prod-28", tenant_id: TENANT_ID, name: "Carrete Frontal 2500 Spinning",
    normalized_name: "carrete frontal 2500 spinning", brand: "Daiwa", category_id: "cat-02",
    sale_price: 27990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-10T00:00:00Z", updated_at: "2025-03-10T00:00:00Z",
  },
  {
    id: "prod-29", tenant_id: TENANT_ID, name: "Kit Limpieza Rifle Aire",
    normalized_name: "kit limpieza rifle aire", brand: "Gamo", category_id: "cat-05",
    sale_price: 12990, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-15T00:00:00Z", updated_at: "2025-03-15T00:00:00Z",
  },
  {
    id: "prod-30", tenant_id: TENANT_ID, name: "Carnada Trucha Preparada 200g",
    normalized_name: "carnada trucha preparada 200g", brand: "Berkley", category_id: "cat-03",
    sale_price: 3490, cost_status: "missing",
    is_active: true, metadata: {}, created_at: "2025-03-15T00:00:00Z", updated_at: "2025-03-15T00:00:00Z",
  },
];

// --- ALERTAS (10) ---
export const demoAlerts: Alert[] = [
  {
    id: "alert-01", tenant_id: TENANT_ID, alert_type: "missing_cost", severity: "critical",
    title: "15 productos sin costo asignado",
    description: "El 50% del catálogo no tiene costo registrado. Imposible calcular margen.",
    status: "open", created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "alert-02", tenant_id: TENANT_ID, alert_type: "no_sku", severity: "high",
    title: "2 productos sin SKU",
    description: "Jig Head 1/4oz y Vinilo Curly Tail no tienen SKU asignado.",
    resource_type: "product", status: "open", created_at: "2026-02-19T14:00:00Z",
  },
  {
    id: "alert-03", tenant_id: TENANT_ID, alert_type: "data_gap", severity: "critical",
    title: "Sin datos de venta en diciembre 2025",
    description: "No se registraron ventas para diciembre 2025. ¿Falta carga de datos?",
    status: "open", created_at: "2026-02-18T09:00:00Z",
  },
  {
    id: "alert-04", tenant_id: TENANT_ID, alert_type: "duplicate_seller", severity: "medium",
    title: "Vendedores duplicados detectados",
    description: "\"Carlos R.\" y \"Carlos Rodriguez\" podrían ser la misma persona.",
    status: "open", created_at: "2026-02-17T16:00:00Z",
  },
  {
    id: "alert-05", tenant_id: TENANT_ID, alert_type: "negative_margin", severity: "high",
    title: "Margen negativo en Cucharilla Ondulante",
    description: "El costo registrado ($6.200) es mayor al precio de venta ($5.990).",
    resource_type: "product", resource_id: "prod-05", status: "open", created_at: "2026-02-16T11:00:00Z",
  },
  {
    id: "alert-06", tenant_id: TENANT_ID, alert_type: "low_stock", severity: "high",
    title: "Stock bajo en Caballito Pokee 5cm",
    description: "Solo quedan 2 unidades. Promedio de venta: 8/mes.",
    resource_type: "product", resource_id: "prod-07", status: "open", created_at: "2026-02-15T08:00:00Z",
  },
  {
    id: "alert-07", tenant_id: TENANT_ID, alert_type: "slow_moving", severity: "low",
    title: "Producto sin movimiento: Wader Neopreno",
    description: "Sin ventas en los últimos 90 días.",
    resource_type: "product", resource_id: "prod-21", status: "acknowledged", created_at: "2026-02-14T10:00:00Z",
  },
  {
    id: "alert-08", tenant_id: TENANT_ID, alert_type: "data_gap", severity: "medium",
    title: "Carga de inventario incompleta",
    description: "La última carga de inventario solo incluyó 18 de 30 productos.",
    status: "open", created_at: "2026-02-13T15:00:00Z",
  },
  {
    id: "alert-09", tenant_id: TENANT_ID, alert_type: "missing_cost", severity: "high",
    title: "Productos nuevos sin costeo",
    description: "5 productos agregados en febrero aún no tienen costo.",
    status: "open", created_at: "2026-02-12T09:00:00Z",
  },
  {
    id: "alert-10", tenant_id: TENANT_ID, alert_type: "overstock", severity: "low",
    title: "Sobrestock en Línea Monofilamento",
    description: "150 unidades en stock, venta promedio de 10/mes. Cobertura: 15 meses.",
    resource_type: "product", resource_id: "prod-09", status: "dismissed", created_at: "2026-02-10T12:00:00Z",
  },
];

// --- LÍNEAS DE VENTA (100 simuladas, últimos 3 meses) ---
function generateSaleLines(): SaleLine[] {
  const sellers = ["Carlos R.", "María P.", "Juan M.", "Carlos Rodriguez", "Ana S."];
  const payments = ["Efectivo", "Débito", "Crédito", "Transferencia"];
  const lines: SaleLine[] = [];

  // Productos con sus nombres "crudos" (como aparecerían en un CSV de ventas)
  const saleProducts = [
    { raw: "Caña Telesc. Mar 3.6", id: "prod-01", matched: true },
    { raw: "Caña Spinning 2.1m", id: "prod-02", matched: true },
    { raw: "Carrete Shimano 4000", id: "prod-03", matched: true },
    { raw: "Carrete BC Abu Garcia", id: "prod-04", matched: true },
    { raw: "Cucharilla Plata 7g", id: "prod-05", matched: true },
    { raw: "Rapala Minnow Trucha", id: "prod-06", matched: true },
    { raw: "Caballito Pokee Chico", id: "prod-07", matched: true },
    { raw: "Caballito Grande", id: "prod-08", matched: true },
    { raw: "Nylon 0.30 Sufix", id: "prod-09", matched: true },
    { raw: "Multifilamento PP", id: "prod-10", matched: true },
    { raw: "Jig Head 1/4", id: "prod-16", matched: false },
    { raw: "Vinilo Curly Berkley", id: "prod-17", matched: false },
    { raw: "Señuelo desconocido rojo", id: undefined, matched: false },
    { raw: "Anzuelos varios", id: undefined, matched: false },
    { raw: "Caña fly importada", id: undefined, matched: false },
  ];

  for (let i = 0; i < 100; i++) {
    const prod = saleProducts[i % saleProducts.length];
    const monthOffset = Math.floor(i / 34); // Distribuir en 3 meses
    const month = 12 + monthOffset; // Dic 2025 - Feb 2026
    const year = month > 12 ? 2026 : 2025;
    const actualMonth = month > 12 ? month - 12 : month;
    const day = (i % 28) + 1;
    const qty = Math.floor(Math.random() * 5) + 1;
    const price = 3990 + Math.floor(Math.random() * 50000);

    lines.push({
      id: `sale-${String(i + 1).padStart(3, "0")}`,
      tenant_id: TENANT_ID,
      sale_date: `${year}-${String(actualMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      product_raw_name: prod.raw,
      product_id: prod.id,
      match_status: prod.matched ? (prod.id ? "fuzzy" : "unmatched") : "unmatched",
      quantity: qty,
      unit_price: price,
      total_amount: qty * price,
      seller_name: sellers[i % sellers.length],
      payment_method: payments[i % payments.length],
      ticket_number: `T-${String(1000 + i)}`,
      raw_data: {},
      created_at: `${year}-${String(actualMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}T12:00:00Z`,
    });
  }
  return lines;
}

export const demoSaleLines: SaleLine[] = generateSaleLines();

// --- INCIDENTES DE CALIDAD ---
export const demoIncidents: DataQualityIncident[] = [
  {
    id: "inc-01", tenant_id: TENANT_ID, incident_type: "Costo faltante",
    severity: "critical", description: "15 de 30 productos no tienen costo asignado",
    affected_records: 15, status: "open", created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "inc-02", tenant_id: TENANT_ID, incident_type: "SKU faltante",
    severity: "high", description: "2 productos sin código SKU identificable",
    affected_records: 2, status: "open", created_at: "2026-02-19T14:00:00Z",
  },
  {
    id: "inc-03", tenant_id: TENANT_ID, incident_type: "Mes vacío",
    severity: "critical", description: "Diciembre 2025 sin datos de venta cargados",
    affected_records: 0, status: "open", created_at: "2026-02-18T09:00:00Z",
  },
  {
    id: "inc-04", tenant_id: TENANT_ID, incident_type: "Vendedor duplicado",
    severity: "medium", description: "\"Carlos R.\" y \"Carlos Rodriguez\" podrían ser duplicados",
    affected_records: 2, status: "investigating", created_at: "2026-02-17T16:00:00Z",
  },
  {
    id: "inc-05", tenant_id: TENANT_ID, incident_type: "Venta sin mapear",
    severity: "high", description: "20 líneas de venta no coinciden con el maestro de productos",
    affected_records: 20, status: "open", created_at: "2026-02-16T11:00:00Z",
  },
  {
    id: "inc-06", tenant_id: TENANT_ID, incident_type: "Margen negativo",
    severity: "high", description: "1 producto con costo mayor al precio de venta",
    affected_records: 1, status: "open", created_at: "2026-02-15T08:00:00Z",
  },
  {
    id: "inc-07", tenant_id: TENANT_ID, incident_type: "Inventario incompleto",
    severity: "medium", description: "Última carga de inventario cubre solo 60% del catálogo",
    affected_records: 12, status: "open", created_at: "2026-02-14T10:00:00Z",
  },
];

// --- HISTORIAL DE CARGAS ---
export const demoUploads: FileUpload[] = [
  {
    id: "upload-01", tenant_id: TENANT_ID, uploaded_by: "user-01", bucket: "uploads",
    file_path: "propezca/ventas-enero-2026.csv", original_name: "ventas-enero-2026.csv",
    mime_type: "text/csv", size_bytes: 45600, metadata: { rows: 34, errors: 2 },
    status: "processed", created_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "upload-02", tenant_id: TENANT_ID, uploaded_by: "user-01", bucket: "uploads",
    file_path: "propezca/ventas-febrero-2026.csv", original_name: "ventas-febrero-2026.csv",
    mime_type: "text/csv", size_bytes: 38200, metadata: { rows: 28, errors: 0 },
    status: "processed", created_at: "2026-02-15T09:00:00Z",
  },
  {
    id: "upload-03", tenant_id: TENANT_ID, uploaded_by: "user-01", bucket: "uploads",
    file_path: "propezca/inventario-feb-2026.xlsx", original_name: "inventario-feb-2026.xlsx",
    mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size_bytes: 125000, metadata: { rows: 18, errors: 5, warnings: 3 },
    status: "processed", created_at: "2026-02-18T14:00:00Z",
  },
  {
    id: "upload-04", tenant_id: TENANT_ID, uploaded_by: "user-01", bucket: "uploads",
    file_path: "propezca/costos-proveedores.csv", original_name: "costos-proveedores.csv",
    mime_type: "text/csv", size_bytes: 12800, metadata: { rows: 15, errors: 0 },
    status: "processed", created_at: "2026-02-10T11:00:00Z",
  },
];

// --- MÉTRICAS DE CALIDAD ---
export const qualityMetrics = {
  costCoverage: 50, // 15 de 30 productos con costo
  skuMapping: 80, // 80% de ventas mapeadas a SKU
  dataCompleteness: 33, // 4 de 12 meses con datos
  overallScore: 45, // Score ponderado
  totalProducts: 30,
  productsWithCost: 15,
  productsWithoutCost: 15,
  productsWithoutSku: 2,
  totalSaleLines: 100,
  matchedSaleLines: 68,
  unmatchedSaleLines: 32,
  monthsWithData: 4,
  monthsExpected: 12,
  duplicateSellers: 1,
};
