// Navbar con identidad Propezca pesca
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Fish } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

const navLinks = [
  { label: "Tienda", href: "/tienda" },
  { label: "Puntos", href: "/#puntos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount);
  const count = itemCount();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-primary text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Fish className="h-6 w-6" />
          PROPEZCA
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Carrito */}
          <Link href="/tienda/carrito" className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-white">
                {count}
              </Badge>
            )}
          </Link>

          {/* Mi Cuenta */}
          <Link href="/cuenta">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
              <User className="mr-1.5 h-4 w-4" />
              Mi Cuenta
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              Ingresar
            </Button>
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/tienda/carrito" className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-white">
                {count}
              </Badge>
            )}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/cuenta" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Mi Cuenta
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Ingresar
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
