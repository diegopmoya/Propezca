// Costeo y Márgenes — Página placeholder
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { DollarSign } from "lucide-react";

export default function CosteoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Costeo y Márgenes"
        description="Análisis de rentabilidad por producto, línea y categoría"
      />
      <EmptyState
        icon={DollarSign}
        title="Próximamente"
        description="El módulo de costeo y márgenes estará disponible en la próxima versión. Por ahora puedes ver los márgenes en el Maestro de Productos."
      />
    </div>
  );
}
