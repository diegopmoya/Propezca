// Configuración — Página placeholder
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Ajustes de tu empresa y cuenta"
      />

      <Card>
        <CardHeader>
          <CardTitle>Datos de la Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre de la empresa</Label>
              <Input defaultValue={COMPANY_INFO.name} />
            </div>
            <div className="space-y-2">
              <Label>RUT</Label>
              <Input placeholder="76.XXX.XXX-X" />
            </div>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input defaultValue={COMPANY_INFO.address} />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input defaultValue={COMPANY_INFO.phone} />
            </div>
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
}
