// Maestro de Productos — Catálogo normalizado con filtros y acciones
"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Pencil, Search } from "lucide-react";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import type { Product } from "@/types/database";

// Formato de moneda chilena
function formatCLP(value?: number) {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Badge de estado del producto
function ProductStatusBadge({ product }: { product: Product }) {
  if (product.cost_status === "complete" && product.sku) {
    return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Completo</Badge>;
  }
  if (product.cost_status === "missing") {
    return <Badge variant="destructive" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Sin costo</Badge>;
  }
  if (!product.sku) {
    return <Badge variant="destructive">Sin SKU</Badge>;
  }
  return <Badge variant="secondary">Parcial</Badge>;
}

// Modal de agregar/editar producto
function ProductFormDialog({
  product,
  trigger,
}: {
  product?: Product;
  trigger: React.ReactNode;
}) {
  const isEdit = !!product;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Producto" : "Agregar Producto"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifica los datos del producto"
              : "Ingresa los datos del nuevo producto"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                defaultValue={product?.name}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input defaultValue={product?.sku ?? ""} placeholder="CAN-001" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input
                defaultValue={product?.brand ?? ""}
                placeholder="Marca"
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select defaultValue={product?.category_id ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {demoCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Costo actual</Label>
              <Input
                type="number"
                defaultValue={product?.current_cost ?? ""}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Precio venta</Label>
              <Input
                type="number"
                defaultValue={product?.sale_price ?? ""}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">
            {isEdit ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MaestroPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtrar productos
  const filtered = useMemo(() => {
    return demoProducts.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (p.brand?.toLowerCase().includes(search.toLowerCase()) ?? false);

      const matchesCategory =
        categoryFilter === "all" || p.category_id === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "complete" &&
          p.cost_status === "complete" &&
          p.sku) ||
        (statusFilter === "no_cost" && p.cost_status === "missing") ||
        (statusFilter === "no_sku" && !p.sku);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  // Encontrar nombre de categoría
  function getCategoryName(categoryId?: string) {
    if (!categoryId) return "—";
    return demoCategories.find((c) => c.id === categoryId)?.name ?? "—";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maestro de Productos"
        description={`${demoProducts.length} productos registrados`}
      >
        <ProductFormDialog
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          }
        />
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Importar CSV
        </Button>
      </PageHeader>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, SKU o marca..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {demoCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="complete">Completo</SelectItem>
                <SelectItem value="no_cost">Sin costo</SelectItem>
                <SelectItem value="no_sku">Sin SKU</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de productos */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="hidden sm:table-cell">SKU</TableHead>
                <TableHead className="hidden md:table-cell">Categoría</TableHead>
                <TableHead className="hidden lg:table-cell">Marca</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Costo</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Margen</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {product.sku ?? "Sin SKU"} · {getCategoryName(product.category_id)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {product.sku ?? "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {getCategoryName(product.category_id)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {product.brand ?? "—"}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell text-sm">
                    {formatCLP(product.current_cost)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatCLP(product.sale_price)}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell text-sm">
                    {product.margin_pct != null ? (
                      <span className="text-emerald-600 font-medium">
                        {product.margin_pct}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <ProductStatusBadge product={product} />
                  </TableCell>
                  <TableCell>
                    <ProductFormDialog
                      product={product}
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No se encontraron productos con los filtros seleccionados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
