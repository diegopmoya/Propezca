// Dashboard principal de Propezca Control
import { PageHeader } from "@/components/layout/page-header";
import { KpiCard } from "@/components/shared/kpi-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, DollarSign, AlertTriangle, ShieldCheck } from "lucide-react";
import { demoAlerts, demoProducts, qualityMetrics } from "@/lib/demo-data";

// Calcular KPIs desde datos demo
const productsWithCost = demoProducts.filter(
  (p) => p.cost_status === "complete"
).length;
const totalProducts = demoProducts.length;
const costPct = Math.round((productsWithCost / totalProducts) * 100);

const productsWithMargin = demoProducts.filter((p) => p.margin_pct != null);
const avgMargin =
  productsWithMargin.length > 0
    ? (
        productsWithMargin.reduce((sum, p) => sum + (p.margin_pct ?? 0), 0) /
        productsWithMargin.length
      ).toFixed(1)
    : "Sin datos";

const activeAlerts = demoAlerts.filter(
  (a) => a.status === "open" || a.status === "acknowledged"
).length;

// Badges de severidad
function SeverityBadge({ severity }: { severity: string }) {
  const variants: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
    critical: "destructive",
    high: "destructive",
    medium: "default",
    low: "secondary",
  };
  const labels: Record<string, string> = {
    critical: "Crítico",
    high: "Alto",
    medium: "Medio",
    low: "Bajo",
  };
  return (
    <Badge variant={variants[severity] ?? "default"}>
      {labels[severity] ?? severity}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    open: "Abierta",
    acknowledged: "Revisando",
    resolved: "Resuelta",
    dismissed: "Descartada",
  };
  const styles: Record<string, string> = {
    open: "bg-amber-100 text-amber-800",
    acknowledged: "bg-blue-100 text-blue-800",
    resolved: "bg-emerald-100 text-emerald-800",
    dismissed: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? ""}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

// Nombres legibles de tipos de alerta
const alertTypeLabels: Record<string, string> = {
  missing_cost: "Costo faltante",
  low_stock: "Stock bajo",
  overstock: "Sobrestock",
  no_sku: "Sin SKU",
  data_gap: "Brecha de datos",
  duplicate_seller: "Vendedor duplicado",
  negative_margin: "Margen negativo",
  slow_moving: "Baja rotación",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Vista general de Propezca Control"
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Productos en Maestro"
          value={String(totalProducts)}
          description={`${costPct}% con costo asignado`}
          icon={Package}
        />
        <KpiCard
          title="Margen Promedio"
          value={typeof avgMargin === "string" ? avgMargin : `${avgMargin}%`}
          description="Sobre productos con costo"
          icon={DollarSign}
          trend={
            typeof avgMargin !== "string"
              ? { value: "vs. mes anterior", positive: true }
              : undefined
          }
        />
        <KpiCard
          title="Alertas Activas"
          value={String(activeAlerts)}
          description="Requieren atención"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Calidad de Datos"
          value={`${qualityMetrics.overallScore}%`}
          description="Score ponderado general"
          icon={ShieldCheck}
        />
      </div>

      {/* Tabla de alertas recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recientes</CardTitle>
          <CardDescription>
            Últimos problemas detectados que requieren atención
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alerta</TableHead>
                <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                <TableHead>Severidad</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoAlerts.slice(0, 8).map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {alertTypeLabels[alert.alert_type] ?? alert.alert_type}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {alertTypeLabels[alert.alert_type] ?? alert.alert_type}
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={alert.severity} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {new Date(alert.created_at).toLocaleDateString("es-CL")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={alert.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
