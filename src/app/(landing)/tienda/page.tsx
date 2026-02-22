// Catálogo público de productos reales
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { realProducts, type ScrapedProduct } from "@/lib/products-data";
import { useCartStore } from "@/stores/cart-store";
import { formatCLP } from "@/lib/utils";

// Nombres únicos para filtro
const uniqueNames = [...new Set(realProducts.map((p) => p.name))].sort();

type SortOption = "name" | "price-asc" | "price-desc" | "points";

function FilterPanel({
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onlyInStock,
  setOnlyInStock,
  sortBy,
  setSortBy,
}: {
  search: string;
  setSearch: (v: string) => void;
  priceMin: string;
  setPriceMin: (v: string) => void;
  priceMax: string;
  setPriceMax: (v: string) => void;
  onlyInStock: boolean;
  setOnlyInStock: (v: boolean) => void;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
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
        <Label className="text-sm font-medium">Ordenar por</Label>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre A-Z</SelectItem>
            <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="points">Más puntos</SelectItem>
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
          Solo con stock
        </Label>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: ScrapedProduct }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card className="group overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/tienda/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>
      <CardContent className="p-3">
        <Link href={`/tienda/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatCLP(product.price)}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {product.points > 0 && (
            <Badge className="bg-accent text-accent-foreground text-xs">
              <Star className="mr-0.5 h-3 w-3" />
              +{product.points} pts
            </Badge>
          )}
          {product.stock > 0 ? (
            <Badge variant="outline" className="text-xs text-green-700 border-green-300">
              Stock: {product.stock}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-red-600 border-red-300">
              Agotado
            </Badge>
          )}
        </div>
        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TiendaPage() {
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = realProducts.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q)) return false;
      }
      if (priceMin && p.price < Number(priceMin)) return false;
      if (priceMax && p.price > Number(priceMax)) return false;
      if (onlyInStock && p.stock <= 0) return false;
      return true;
    });

    // Ordenar
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "points":
        result.sort((a, b) => b.points - a.points);
        break;
    }

    return result;
  }, [search, priceMin, priceMax, onlyInStock, sortBy]);

  const filterProps = {
    search, setSearch, priceMin, setPriceMin,
    priceMax, setPriceMax, onlyInStock, setOnlyInStock,
    sortBy, setSortBy,
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

        {/* Product grid — 4/3/2/1 cols */}
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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
