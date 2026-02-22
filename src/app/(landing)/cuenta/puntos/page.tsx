// Mis Puntos — saldo, tier, movimientos
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Trophy } from "lucide-react";
import { demoPointsBalance, demoPointsLedger, demoLoyaltyConfig } from "@/lib/demo-data";

const tierConfig: Record<string, { label: string; color: string }> = {
  bronze: { label: "Bronce", color: "bg-amber-700 text-white" },
  silver: { label: "Plata", color: "bg-gray-400 text-white" },
  gold: { label: "Oro", color: "bg-yellow-500 text-white" },
};

const movementLabels: Record<string, { label: string; color: string }> = {
  earn: { label: "Ganancia", color: "text-green-600" },
  redeem: { label: "Canje", color: "text-red-600" },
  expire: { label: "Vencimiento", color: "text-orange-600" },
  adjust: { label: "Ajuste", color: "text-blue-600" },
  bonus: { label: "Bonus", color: "text-purple-600" },
  refund: { label: "Reembolso", color: "text-gray-600" },
};

export default function PuntosPage() {
  const balance = demoPointsBalance;
  const tier = tierConfig[balance.tier];
  const tiers = demoLoyaltyConfig.tiers;

  // Cálculo de progreso al siguiente tier
  const currentTierIdx = tiers.findIndex((t) => t.name === balance.tier);
  const nextTier = tiers[currentTierIdx + 1];
  const progressPct = nextTier
    ? Math.min(
        100,
        ((balance.total_earned - tiers[currentTierIdx].min_points) /
          (nextTier.min_points - tiers[currentTierIdx].min_points)) *
          100
      )
    : 100;

  return (
    <div className="space-y-6">
      {/* Saldo y tier */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Star className="mb-2 h-10 w-10 text-amber-500" />
            <p className="text-4xl font-bold">
              {balance.current_balance.toLocaleString("es-CL")}
            </p>
            <p className="text-sm text-muted-foreground">puntos disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Trophy className="mb-2 h-10 w-10 text-amber-700" />
            <Badge className={`${tier.color} text-lg px-4 py-1`}>
              {tier.label}
            </Badge>
            <p className="mt-2 text-sm text-muted-foreground">Nivel actual</p>
            {nextTier && (
              <div className="mt-4 w-full max-w-xs">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{tier.label}</span>
                  <span>{tierConfig[nextTier.name].label}</span>
                </div>
                <Progress value={progressPct} className="h-2" />
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  {(nextTier.min_points - balance.total_earned).toLocaleString(
                    "es-CL"
                  )}{" "}
                  pts para el siguiente nivel
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumen */}
      <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              +{balance.total_earned.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-muted-foreground">Total ganados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              -{balance.total_redeemed.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-muted-foreground">Total canjeados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              -{balance.total_expired.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-muted-foreground">Total vencidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de movimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Movimientos de Puntos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Puntos</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...demoPointsLedger].reverse().map((entry) => {
                  const config =
                    movementLabels[entry.movement_type] ?? movementLabels.earn;
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {new Date(entry.created_at).toLocaleDateString("es-CL")}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate">
                        {entry.description}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          entry.points > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {entry.points > 0 ? "+" : ""}
                        {entry.points.toLocaleString("es-CL")}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.balance_after.toLocaleString("es-CL")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
