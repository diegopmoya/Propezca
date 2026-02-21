// Footer compartido para landing y páginas públicas
import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <h3 className="text-lg font-bold text-foreground">Propezca Control</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Inteligencia de datos para tu negocio de pesca y caza.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Términos de Uso</li>
              <li>Política de Privacidad</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-foreground">Contacto</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>{COMPANY_INFO.address}</li>
              <li>{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.website}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
          Powered by IACraft.
        </div>
      </div>
    </footer>
  );
}
