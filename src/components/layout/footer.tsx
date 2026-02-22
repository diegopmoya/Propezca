// Footer con identidad Propezca pesca
import Link from "next/link";
import { Fish } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Fish className="h-5 w-5" />
              PROPEZCA
            </div>
            <p className="mt-2 text-sm text-white/70">
              Tu tienda de pesca, caza, buceo y camping en Talca.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-semibold">Tienda</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li><Link href="/tienda" className="hover:text-white">Catálogo</Link></li>
              <li><Link href="/tienda/carrito" className="hover:text-white">Carrito</Link></li>
              <li><Link href="/cuenta/puntos" className="hover:text-white">Mis Puntos</Link></li>
              <li><Link href="/cuenta/pedidos" className="hover:text-white">Mis Pedidos</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li>Términos de Uso</li>
              <li>Política de Privacidad</li>
              <li>Cambios y Devoluciones</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold">Contacto</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li>{COMPANY_INFO.address}</li>
              <li>{COMPANY_INFO.phone}</li>
              <li>
                <a
                  href="https://wa.me/56942007775"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
