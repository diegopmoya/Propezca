// Alertas — Vista completa de alertas del sistema
import { PageHeader } from "@/components/layout/page-header";
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
import { demoAlerts } from "@/lib/demo-data";

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

function SeverityBadge({ severity }: { severity: string }) {
  const config: Record<string, { label: string; variant: "destructive" | "default" | "secondary" }> = {
    critical: { label: "Crítico", variant: "destructive" },
    high: { label: "Alto", variant: "destructive" },
    medium: { label: "Medio", variant: "default" },
    low: { label: "Bajo", variant: "secondary" },
  };
  const c = config[severity] ?? { label: severity, variant: "default" as const };
  return <Badge variant={c.variant}>{c.label}</Badge>;
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
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? ""}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default function AlertasPage() {
  const openAlerts = demoAlerts.filter((a) => a.status === "open" || a.status === "acknowledged");
  const resolvedAlerts = demoAlerts.filter((a) => a.status === "resolved" || a.status === "dismissed");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alertas"
        description={`${openAlerts.length} alertas activas`}
      />

      <Card>
        <CardHeader>
          <CardTitle>Alertas Activas</CardTitle>
          <CardDescription>Problemas que requieren atención</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
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
              {openAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {alert.description}
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

      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historial</CardTitle>
            <CardDescription>Alertas resueltas o descartadas</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alerta</TableHead>
                  <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resolvedAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="text-sm">{alert.title}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {alertTypeLabels[alert.alert_type] ?? alert.alert_type}
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
      )}
    </div>
  );
}
