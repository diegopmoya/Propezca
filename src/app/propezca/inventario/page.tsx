// Inventario — Página placeholder
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ClipboardList } from "lucide-react";

export default function InventarioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventario"
        description="Control de stock, rotación y cobertura"
      />
      <EmptyState
        icon={ClipboardList}
        title="Próximamente"
        description="El módulo de inventario estará disponible en la próxima versión. Carga tu archivo de inventario desde la sección Carga de Datos."
      />
    </div>
  );
}
