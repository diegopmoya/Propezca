// Mis Pedidos — historial de pedidos del usuario
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { demoOrders, demoOrderItems } from "@/lib/demo-data";
import { formatCLP } from "@/lib/utils";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pendiente", variant: "secondary" },
  confirmed: { label: "Confirmado", variant: "outline" },
  paid: { label: "Pagado", variant: "default" },
  preparing: { label: "Preparando", variant: "default" },
  shipped: { label: "Enviado", variant: "default" },
  delivered: { label: "Entregado", variant: "default" },
  cancelled: { label: "Cancelado", variant: "destructive" },
};

export default function PedidosPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead># Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoOrders.map((order) => {
                const items = demoOrderItems.filter(
                  (oi) => oi.order_id === order.id
                );
                const config = statusConfig[order.status] ?? statusConfig.pending;
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.order_number}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString("es-CL")}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        {items.map((item) => (
                          <p key={item.id} className="truncate text-sm">
                            {item.quantity}x {item.product_name}
                          </p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCLP(order.total)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
