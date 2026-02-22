// Detalle de producto
"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Fish,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import { useCartStore } from "@/stores/cart-store";
import { formatCLP } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const product = demoProducts.find((p) => p.id === productId);
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Fish className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link href="/tienda">
          <Button className="mt-4">Volver a la tienda</Button>
        </Link>
      </div>
    );
  }

  const category = demoCategories.find((c) => c.id === product.category_id);
  const relatedProducts = demoProducts
    .filter(
      (p) => p.category_id === product.category_id && p.id !== product.id
    )
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/tienda" className="hover:text-foreground">
          Tienda
        </Link>
        <ChevronRight className="h-4 w-4" />
        {category && (
          <>
            <Link
              href={`/tienda?category=${category.id}`}
              className="hover:text-foreground"
            >
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Producto */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Imagen */}
        <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted/30">
          <Fish className="h-32 w-32 text-muted-foreground/20" />
        </div>

        {/* Info */}
        <div>
          {product.brand && (
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            {product.name}
          </h1>
          {product.sku && (
            <p className="mt-1 text-sm text-muted-foreground">
              SKU: {product.sku}
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {formatCLP(product.sale_price ?? 0)}
            </span>
          </div>

          {product.points_value && product.points_value > 0 && (
            <Badge variant="secondary" className="mt-2">
              <Star className="mr-1 h-3.5 w-3.5" />
              Gana {product.points_value} puntos con esta compra
            </Badge>
          )}

          <Separator className="my-6" />

          {/* Selector cantidad */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Cantidad:</span>
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="flex h-9 w-12 items-center justify-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={handleAdd}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Agregar al Carrito
          </Button>

          {product.is_active && (
            <p className="mt-4 text-sm text-green-600 font-medium">
              Disponible para envío
            </p>
          )}
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold">Productos relacionados</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <Card
                key={p.id}
                className="group overflow-hidden border shadow-sm transition-shadow hover:shadow-md"
              >
                <Link href={`/tienda/${p.id}`}>
                  <div className="flex aspect-square items-center justify-center bg-muted/30">
                    <Fish className="h-12 w-12 text-muted-foreground/30 transition-colors group-hover:text-primary/40" />
                  </div>
                </Link>
                <CardContent className="p-3">
                  {p.brand && (
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      {p.brand}
                    </p>
                  )}
                  <Link href={`/tienda/${p.id}`}>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold hover:text-primary">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="mt-1 font-bold">
                    {formatCLP(p.sale_price ?? 0)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
