// Sidebar para mobile (dentro de un Sheet)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Package,
  DollarSign,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Upload,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/propezca/dashboard", icon: BarChart3 },
  { label: "Maestro de Productos", href: "/propezca/maestro", icon: Package },
  { label: "Costeo y Márgenes", href: "/propezca/costeo", icon: DollarSign },
  { label: "Inventario", href: "/propezca/inventario", icon: ClipboardList },
  { label: "Alertas", href: "/propezca/alertas", icon: AlertTriangle },
  { label: "Calidad de Datos", href: "/propezca/calidad", icon: TrendingUp },
  { label: "Carga de Datos", href: "/propezca/carga", icon: Upload },
  { label: "Configuración", href: "/propezca/configuracion", icon: Settings },
];

interface MobileSidebarProps {
  onNavigate: () => void;
}

export function MobileSidebar({ onNavigate }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-bold">
          Propezca<span className="text-primary"> Control</span>
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
