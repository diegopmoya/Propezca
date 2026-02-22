// Mi Perfil — datos del usuario
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function PerfilPage() {
  const [name, setName] = useState("Diego Moya");
  const [phone, setPhone] = useState("+56 9 4200 7775");
  const [rut, setRut] = useState("12.345.678-9");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              value="diego@propezca.cl"
              readOnly
              disabled
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="rut">RUT</Label>
            <Input
              id="rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
        <Button className="mt-6">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </CardContent>
    </Card>
  );
}
