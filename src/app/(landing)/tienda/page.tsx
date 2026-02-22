// Catálogo público de productos
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fish, Search, SlidersHorizontal, Star, ShoppingCart } from "lucide-react";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import { useCartStore } from "@/stores/cart-store";
import { formatCLP } from "@/lib/utils";

// Marcas únicas de los productos
const brands = [...new Set(demoProducts.map((p) => p.brand).filter(Boolean))].sort() as string[];

function FilterPanel({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onlyInStock,
  setOnlyInStock,
}: {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  brand: string;
  setBrand: (v: string) => void;
  priceMin: string;
  setPriceMin: (v: string) => void;
  priceMax: string;
  setPriceMax: (v: string) => void;
  onlyInStock: boolean;
  setOnlyInStock: (v: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium">Buscar</Label>
        <div className="relative mt-1.5">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Categoría</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {demoCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium">Marca</Label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium">Rango de precio</Label>
        <div className="mt-1.5 flex gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="in-stock"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
          className="rounded border-input"
        />
        <Label htmlFor="in-stock" className="text-sm">
          Solo disponibles
        </Label>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof demoProducts)[0] }) {
  const addItem = useCartStore((s) => s.addItem);
  const categoryName = demoCategories.find((c) => c.id === product.category_id)?.name;

  return (
    <Card className="group overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/tienda/${product.id}`}>
        <div className="flex aspect-square items-center justify-center bg-muted/30">
          <Fish className="h-16 w-16 text-muted-foreground/30 transition-colors group-hover:text-primary/40" />
        </div>
      </Link>
      <CardContent className="p-4">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
        )}
        <Link href={`/tienda/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">
            {formatCLP(product.sale_price ?? 0)}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.points_value && product.points_value > 0 && (
            <Badge variant="secondary" className="text-xs">
              <Star className="mr-1 h-3 w-3" />
              +{product.points_value} pts
            </Badge>
          )}
          {categoryName && (
            <Badge variant="outline" className="text-xs">
              {categoryName}
            </Badge>
          )}
          {product.is_active && (
            <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-100">
              Disponible
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          className="mt-3 w-full"
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TiendaPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return demoProducts.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !(p.brand ?? "").toLowerCase().includes(q) &&
          !(p.sku ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      if (category !== "all" && p.category_id !== category) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (priceMin && (p.sale_price ?? 0) < Number(priceMin)) return false;
      if (priceMax && (p.sale_price ?? 0) > Number(priceMax)) return false;
      if (onlyInStock && !p.is_active) return false;
      return true;
    });
  }, [search, category, brand, priceMin, priceMax, onlyInStock]);

  const filterProps = {
    search, setSearch, category, setCategory, brand, setBrand,
    priceMin, setPriceMin, priceMax, setPriceMax, onlyInStock, setOnlyInStock,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Tienda</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Mobile filter button */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterPanel {...filterProps} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-lg border bg-card p-4">
            <h2 className="mb-4 font-semibold">Filtros</h2>
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Fish className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <h3 className="text-lg font-semibold">No se encontraron productos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
