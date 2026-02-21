// Calidad de Datos — Métricas, score y tabla de incidentes
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import {
  ShieldCheck,
  DollarSign,
  Link2,
  CalendarDays,
  Users,
} from "lucide-react";
import { qualityMetrics, demoIncidents } from "@/lib/demo-data";

// Score visual circular
function QualityScore({ score }: { score: number }) {
  const color =
    score >= 70
      ? "text-emerald-600"
      : score >= 40
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-full border-8 ${
          score >= 70
            ? "border-emerald-200"
            : score >= 40
              ? "border-amber-200"
              : "border-red-200"
        }`}
      >
        <span className={`text-4xl font-bold ${color}`}>{score}%</span>
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        Score General
      </p>
    </div>
  );
}

// Tarjeta de métrica con barra de progreso
function MetricCard({
  icon: Icon,
  title,
  value,
  total,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  total: number;
  description: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="flex items-end justify-between mb-2">
          <span className="text-2xl font-bold">{pct}%</span>
          <span className="text-xs text-muted-foreground">
            {value} / {total}
          </span>
        </div>
        <Progress value={pct} className="h-2" />
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Badge de severidad de incidente
function IncidentSeverityBadge({ severity }: { severity: string }) {
  const config: Record<
    string,
    { label: string; variant: "destructive" | "default" | "secondary" | "outline" }
  > = {
    critical: { label: "Crítico", variant: "destructive" },
    high: { label: "Alto", variant: "destructive" },
    medium: { label: "Medio", variant: "default" },
    low: { label: "Bajo", variant: "secondary" },
  };
  const c = config[severity] ?? { label: severity, variant: "default" as const };
  return <Badge variant={c.variant}>{c.label}</Badge>;
}

function IncidentStatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    open: "Abierto",
    investigating: "En revisión",
    resolved: "Resuelto",
    accepted: "Aceptado",
  };
  const styles: Record<string, string> = {
    open: "bg-amber-100 text-amber-800",
    investigating: "bg-blue-100 text-blue-800",
    resolved: "bg-emerald-100 text-emerald-800",
    accepted: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? ""}`}
    >
      {labels[status] ?? status}
    </span>
  );
}

export default function CalidadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Calidad de Datos"
        description="Diagnóstico de la salud de tus datos"
      />

      {/* Score y métricas */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Score principal */}
        <Card className="lg:col-span-1">
          <CardContent className="flex items-center justify-center pt-6 pb-6">
            <QualityScore score={qualityMetrics.overallScore} />
          </CardContent>
        </Card>

        {/* Métricas individuales */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4">
          <MetricCard
            icon={DollarSign}
            title="Productos con costo"
            value={qualityMetrics.productsWithCost}
            total={qualityMetrics.totalProducts}
            description="Productos con costo asignado vs. total del catálogo"
          />
          <MetricCard
            icon={Link2}
            title="Ventas mapeadas a SKU"
            value={qualityMetrics.matchedSaleLines}
            total={qualityMetrics.totalSaleLines}
            description="Líneas de venta vinculadas al maestro de productos"
          />
          <MetricCard
            icon={CalendarDays}
            title="Meses con datos"
            value={qualityMetrics.monthsWithData}
            total={qualityMetrics.monthsExpected}
            description="Meses con datos cargados vs. meses esperados (último año)"
          />
          <MetricCard
            icon={Users}
            title="Vendedores duplicados"
            value={qualityMetrics.duplicateSellers}
            total={qualityMetrics.duplicateSellers}
            description={`${qualityMetrics.duplicateSellers} posible(s) duplicado(s) detectado(s)`}
          />
        </div>
      </div>

      {/* Tabla de incidentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Incidentes de Datos</CardTitle>
              <CardDescription>
                Anomalías y problemas detectados en tus datos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Registros
                </TableHead>
                <TableHead>Severidad</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium text-sm">
                    {incident.incident_type}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {incident.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-center">
                    {incident.affected_records ?? "—"}
                  </TableCell>
                  <TableCell>
                    <IncidentSeverityBadge severity={incident.severity} />
                  </TableCell>
                  <TableCell>
                    <IncidentStatusBadge status={incident.status} />
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
