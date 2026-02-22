// Mis Direcciones — lista y agregar
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus, Phone } from "lucide-react";
import { demoAddresses } from "@/lib/demo-data";
import type { CustomerAddress } from "@/types/database";

export default function DireccionesPage() {
  const [addresses, setAddresses] = useState<CustomerAddress[]>(demoAddresses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    label: "",
    recipient_name: "",
    street_address: "",
    city: "",
    region: "",
    postal_code: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: CustomerAddress = {
      id: `addr-${Date.now()}`,
      user_id: "00000000-0000-0000-0000-000000000099",
      tenant_id: "00000000-0000-0000-0000-000000000001",
      label: form.label || "Casa",
      recipient_name: form.recipient_name,
      street_address: form.street_address,
      city: form.city,
      region: form.region,
      postal_code: form.postal_code,
      phone: form.phone,
      is_default: addresses.length === 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setAddresses([...addresses, newAddr]);
    setForm({
      label: "",
      recipient_name: "",
      street_address: "",
      city: "",
      region: "",
      postal_code: "",
      phone: "",
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mis Direcciones</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nueva Dirección</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="label">Etiqueta</Label>
                  <Input
                    id="label"
                    placeholder="Ej: Casa, Oficina"
                    value={form.label}
                    onChange={(e) =>
                      setForm({ ...form, label: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient_name">Nombre del destinatario</Label>
                  <Input
                    id="recipient_name"
                    required
                    value={form.recipient_name}
                    onChange={(e) =>
                      setForm({ ...form, recipient_name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="street_address">Dirección</Label>
                <Input
                  id="street_address"
                  required
                  value={form.street_address}
                  onChange={(e) =>
                    setForm({ ...form, street_address: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="city">Ciudad / Comuna</Label>
                  <Input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Región</Label>
                  <Input
                    id="region"
                    required
                    value={form.region}
                    onChange={(e) =>
                      setForm({ ...form, region: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postal_code">Código postal</Label>
                  <Input
                    id="postal_code"
                    value={form.postal_code}
                    onChange={(e) =>
                      setForm({ ...form, postal_code: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="font-semibold">No tienes direcciones guardadas</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Agrega una dirección para agilizar tus compras
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <Card key={addr.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{addr.label}</CardTitle>
                  {addr.is_default && (
                    <Badge variant="secondary" className="text-xs">
                      Predeterminada
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {addr.recipient_name}
                </p>
                <p>{addr.street_address}</p>
                <p>
                  {addr.city}, {addr.region}
                </p>
                {addr.phone && (
                  <p className="mt-1 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {addr.phone}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
