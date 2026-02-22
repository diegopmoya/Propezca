// Layout para la sección de cuenta de usuario (protegida)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Package, Star, MapPin } from "lucide-react";

const accountNav = [
  { label: "Mi Perfil", href: "/cuenta", icon: User },
  { label: "Mis Pedidos", href: "/cuenta/pedidos", icon: Package },
  { label: "Mis Puntos", href: "/cuenta/puntos", icon: Star },
  { label: "Mis Direcciones", href: "/cuenta/direcciones", icon: MapPin },
];

export default function CuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Mi Cuenta</h1>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Sidebar nav */}
        <nav className="flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col">
          {accountNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/cuenta" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Contenido */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
