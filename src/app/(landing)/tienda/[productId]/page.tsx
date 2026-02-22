// Detalle de producto real
"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { realProducts } from "@/lib/products-data";
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

  const product = realProducts.find((p) => p.id === productId);
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

  // Productos relacionados: misma primera palabra del nombre
  const firstWord = product.name.split(" ")[0].toUpperCase();
  const relatedProducts = realProducts
    .filter((p) => p.id !== product.id && p.name.toUpperCase().startsWith(firstWord))
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
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Producto */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatCLP(product.price)}
            </span>
          </div>

          {product.points > 0 && (
            <Badge className="mt-2 bg-accent text-accent-foreground">
              <Star className="mr-1 h-3.5 w-3.5" />
              Gana {product.points} puntos con esta compra
            </Badge>
          )}

          <div className="mt-3">
            {product.stock > 0 ? (
              <p className="text-sm font-medium text-green-600">
                {product.stock} unidad{product.stock !== 1 ? "es" : ""} disponible{product.stock !== 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-sm font-medium text-red-600">Agotado</p>
            )}
          </div>

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
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-6 w-full sm:w-auto"
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Agregar al Carrito
          </Button>
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
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain p-2 transition-transform group-hover:scale-105"
                      sizes="25vw"
                    />
                  </div>
                </Link>
                <CardContent className="p-3">
                  <Link href={`/tienda/${p.id}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold hover:text-primary">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="mt-1 font-bold text-primary">
                    {formatCLP(p.price)}
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
