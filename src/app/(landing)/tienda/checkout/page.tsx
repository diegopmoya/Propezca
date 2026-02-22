// Checkout — flujo de 3 pasos
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  MapPin,
  CreditCard,
  ClipboardCheck,
  Truck,
  Store,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { demoAddresses, demoPointsBalance } from "@/lib/demo-data";
import { formatCLP, cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const steps = [
  { number: 1, label: "Envío", icon: MapPin },
  { number: 2, label: "Pago", icon: CreditCard },
  { number: 3, label: "Confirmación", icon: ClipboardCheck },
] as const;

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const getPointsEarned = useCartStore((s) => s.getPointsEarned);
  const clearCart = useCartStore((s) => s.clearCart);

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedAddress, setSelectedAddress] = useState(
    demoAddresses.find((a) => a.is_default)?.id ?? demoAddresses[0]?.id ?? ""
  );
  const [shippingMethod, setShippingMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber] = useState(
    `PRP-2026-${String(Math.floor(Math.random() * 900) + 100)}`
  );

  const subtotal = getTotal();
  const shippingCost = shippingMethod === "delivery" ? 5990 : 0;
  const maxPointsDiscount = Math.floor(subtotal * 0.5);
  const availablePoints = demoPointsBalance.current_balance;
  const maxUsable = Math.min(availablePoints, maxPointsDiscount);
  const pointsDiscount = usePoints ? Math.min(pointsToUse, maxUsable) : 0;
  const total = subtotal + shippingCost - pointsDiscount;

  if (items.length === 0 && !confirmed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <ClipboardCheck className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold">No hay productos en el carrito</h1>
        <Link href="/tienda">
          <Button className="mt-4">Ir a la Tienda</Button>
        </Link>
      </div>
    );
  }

  // Pantalla de éxito post-confirmación
  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <CheckCircle2 className="mx-auto mb-4 h-20 w-20 text-green-500" />
        <h1 className="text-3xl font-bold">Pedido Confirmado</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tu pedido ha sido registrado exitosamente
        </p>
        <Badge className="mt-4 text-lg px-4 py-1">{orderNumber}</Badge>

        <Card className="mt-8 text-left">
          <CardHeader>
            <CardTitle className="text-base">
              Instrucciones de Transferencia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Banco:</strong> Banco Estado
            </p>
            <p>
              <strong>Tipo de cuenta:</strong> Cuenta Corriente
            </p>
            <p>
              <strong>RUT:</strong> 76.XXX.XXX-X
            </p>
            <p>
              <strong>Email:</strong> pagos@propezca.cl
            </p>
            <p>
              <strong>Monto:</strong> {formatCLP(total)}
            </p>
            <p className="mt-4 text-muted-foreground">
              Envía el comprobante de transferencia a pagos@propezca.cl
              indicando tu número de pedido <strong>{orderNumber}</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/cuenta/pedidos">
            <Button variant="outline">Ver Mis Pedidos</Button>
          </Link>
          <Link href="/tienda">
            <Button>Seguir Comprando</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedAddr = demoAddresses.find((a) => a.id === selectedAddress);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>

      {/* Stepper */}
      <div className="mt-6 flex items-center justify-center gap-0">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                currentStep >= step.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.number ? (
                <Check className="h-4 w-4" />
              ) : (
                <step.icon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 sm:w-16",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Contenido del paso */}
        <div className="lg:col-span-3">
          {/* PASO 1: Envío */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Datos de Envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selección de dirección */}
                <div>
                  <Label className="text-sm font-medium">
                    Dirección de envío
                  </Label>
                  <div className="mt-2 space-y-2">
                    {demoAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                          selectedAddress === addr.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="mt-1"
                        />
                        <div className="text-sm">
                          <p className="font-medium">
                            {addr.label}{" "}
                            {addr.is_default && (
                              <Badge variant="secondary" className="ml-1 text-xs">
                                Predeterminada
                              </Badge>
                            )}
                          </p>
                          <p className="text-muted-foreground">
                            {addr.street_address}, {addr.city}, {addr.region}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Método de envío */}
                <div>
                  <Label className="text-sm font-medium">
                    Método de envío
                  </Label>
                  <div className="mt-2 space-y-2">
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                        shippingMethod === "pickup"
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "pickup"}
                        onChange={() => setShippingMethod("pickup")}
                      />
                      <Store className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          Retiro en tienda
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gratis — 2 Norte #2541, Talca
                        </p>
                      </div>
                      <span className="ml-auto text-sm font-medium text-green-600">
                        Gratis
                      </span>
                    </label>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                        shippingMethod === "delivery"
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "delivery"}
                        onChange={() => setShippingMethod("delivery")}
                      />
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Despacho a domicilio</p>
                        <p className="text-xs text-muted-foreground">
                          3-5 días hábiles
                        </p>
                      </div>
                      <span className="ml-auto text-sm font-medium">
                        {formatCLP(5990)}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>
                    Continuar al Pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PASO 2: Pago */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Transferencia */}
                <div className="rounded-lg border border-primary bg-primary/5 p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <p className="font-medium">Transferencia Bancaria</p>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p>
                      <strong>Banco:</strong> Banco Estado
                    </p>
                    <p>
                      <strong>Cuenta Corriente:</strong> Nº XX-XXX-XXXXX-XX
                    </p>
                    <p>
                      <strong>RUT:</strong> 76.XXX.XXX-X
                    </p>
                    <p>
                      <strong>Email:</strong> pagos@propezca.cl
                    </p>
                  </div>
                </div>

                {/* Usar puntos */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="use-points"
                      checked={usePoints}
                      onChange={(e) => {
                        setUsePoints(e.target.checked);
                        if (!e.target.checked) setPointsToUse(0);
                      }}
                      className="rounded"
                    />
                    <Label
                      htmlFor="use-points"
                      className="flex items-center gap-1"
                    >
                      <Star className="h-4 w-4 text-amber-500" />
                      Usar puntos como descuento
                    </Label>
                  </div>
                  {usePoints && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Saldo disponible:{" "}
                        <strong>
                          {availablePoints.toLocaleString("es-CL")} puntos
                        </strong>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mínimo: 500 pts | Máximo descuento: 50% del subtotal (
                        {formatCLP(maxPointsDiscount)})
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={500}
                          max={maxUsable}
                          value={pointsToUse || ""}
                          onChange={(e) =>
                            setPointsToUse(
                              Math.min(
                                maxUsable,
                                Math.max(0, Number(e.target.value))
                              )
                            )
                          }
                          placeholder={`500 - ${maxUsable}`}
                          className="w-40"
                        />
                        <span className="text-sm text-muted-foreground">
                          puntos = {formatCLP(pointsDiscount)} de descuento
                        </span>
                      </div>
                      {pointsToUse > 0 && pointsToUse < 500 && (
                        <p className="text-xs text-destructive">
                          El mínimo de canje es 500 puntos
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Volver
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Revisar Pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PASO 3: Confirmación */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Productos */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Productos
                  </h3>
                  <div className="mt-2 space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="font-medium">
                          {formatCLP(
                            (item.product.sale_price ?? 0) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Dirección */}
                {shippingMethod === "delivery" && selectedAddr && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Dirección de envío
                    </h3>
                    <p className="mt-1 text-sm">
                      {selectedAddr.recipient_name} —{" "}
                      {selectedAddr.street_address}, {selectedAddr.city},{" "}
                      {selectedAddr.region}
                    </p>
                  </div>
                )}

                {/* Método envío */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Método de envío
                  </h3>
                  <p className="mt-1 text-sm">
                    {shippingMethod === "pickup"
                      ? "Retiro en tienda — Gratis"
                      : `Despacho a domicilio — ${formatCLP(5990)}`}
                  </p>
                </div>

                {/* Pago */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Método de pago
                  </h3>
                  <p className="mt-1 text-sm">Transferencia Bancaria</p>
                </div>

                <Separator />

                {/* Desglose */}
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCLP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>
                      {shippingCost === 0 ? "Gratis" : formatCLP(shippingCost)}
                    </span>
                  </div>
                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento puntos ({pointsDiscount} pts)</span>
                      <span>-{formatCLP(pointsDiscount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCLP(total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-2 text-sm">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-800">
                    Ganarás{" "}
                    <strong>
                      {getPointsEarned().toLocaleString("es-CL")}
                    </strong>{" "}
                    puntos con esta compra
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Volver
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      clearCart();
                      setConfirmed(true);
                    }}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Confirmar Pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Resumen lateral */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-base">Tu Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="truncate pr-2">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatCLP(
                      (item.product.sale_price ?? 0) * item.quantity
                    )}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>
                  {shippingCost === 0 ? "Gratis" : formatCLP(shippingCost)}
                </span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desc. puntos</span>
                  <span>-{formatCLP(pointsDiscount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCLP(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
