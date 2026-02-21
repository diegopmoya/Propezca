// Constantes de la aplicación Propezca Control

export const APP_NAME = "Propezca Control";
export const APP_DESCRIPTION =
  "Controla tu negocio de pesca y caza con inteligencia de datos";
export const TENANT_SLUG = "propezca";

export const COMPANY_INFO = {
  name: "Propezca",
  address: "2 Norte #2541, Talca, Chile",
  phone: "+56 9 4200 7775",
  website: "propezca.cl",
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/propezca/dashboard", icon: "BarChart3" },
  { label: "Maestro de Productos", href: "/propezca/maestro", icon: "Package" },
  { label: "Costeo y Márgenes", href: "/propezca/costeo", icon: "DollarSign" },
  { label: "Inventario", href: "/propezca/inventario", icon: "ClipboardList" },
  { label: "Alertas", href: "/propezca/alertas", icon: "AlertTriangle" },
  { label: "Calidad de Datos", href: "/propezca/calidad", icon: "TrendingUp" },
  { label: "Carga de Datos", href: "/propezca/carga", icon: "Upload" },
  { label: "Configuración", href: "/propezca/configuracion", icon: "Settings" },
] as const;

// Categorías de productos de Propezca
export const PRODUCT_CATEGORIES = [
  "Cañas",
  "Carretes",
  "Señuelos",
  "Líneas",
  "Pesca con Mosca",
  "Accesorios de Caza",
  "Cuchillería",
  "Camping",
  "Carnada",
  "Waders",
] as const;
