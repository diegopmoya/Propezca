// Página del carrito de compras
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Fish,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatCLP } from "@/lib/utils";

export default function CarritoPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getTotal = useCartStore((s) => s.getTotal);
  const getPointsEarned = useCartStore((s) => s.getPointsEarned);
  const clearCart = useCartStore((s) => s.clearCart);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Fish className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">
          Agrega productos desde nuestra tienda para comenzar
        </p>
        <Link href="/tienda">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ir a la Tienda
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Carrito de Compras</h1>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
          Vaciar carrito
        </Button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Lista de items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Imagen */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/tienda/${item.product.id}`}
                        className="font-semibold hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <p className="text-sm font-bold text-primary">
                      {formatCLP(item.product.price)}
                    </p>
                  </div>

                  {/* Cantidad y acciones */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center rounded-md border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-bold">
                      {formatCLP(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumen */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                  productos)
                </span>
                <span className="font-medium">{formatCLP(getTotal())}</span>
              </div>

              <div className="flex items-center gap-1.5 rounded-md bg-accent/10 px-3 py-2 text-sm">
                <Star className="h-4 w-4 text-accent" />
                <span>
                  Ganarías{" "}
                  <strong>{getPointsEarned().toLocaleString("es-CL")}</strong>{" "}
                  puntos
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatCLP(getTotal())}</span>
              </div>

              <Link href="/tienda/checkout" className="block">
                <Button className="w-full" size="lg">
                  Proceder al Pago
                </Button>
              </Link>

              <Link href="/tienda" className="block">
                <Button variant="outline" className="w-full" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Seguir Comprando
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
