// Landing page de Propezca — Tienda de pesca y outdoor en Talca
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Fish,
  Waves,
  Anchor,
  Target,
  MapPin,
  Phone,
  Clock,
  Star,
  Trophy,
  Gift,
  ShoppingCart,
  ArrowRight,
  MessageCircle,
  Flame,
  Sparkles,
} from "lucide-react";
import { realProducts } from "@/lib/products-data";

const bestSellers = [...realProducts]
  .filter((p) => p.stock > 0)
  .sort((a, b) => b.points - a.points)
  .slice(0, 8);

const newArrivals = [...realProducts]
  .filter((p) => p.stock > 0)
  .slice(-8)
  .reverse();

// --- HERO ---
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10"><Waves className="h-32 w-32" /></div>
        <div className="absolute right-20 bottom-20"><Fish className="h-24 w-24" /></div>
        <div className="absolute left-1/2 top-1/3"><Anchor className="h-20 w-20" /></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
            <Fish className="h-4 w-4" />
            Tu tienda de confianza desde Talca
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tu tienda de pesca{" "}
            <span className="text-accent">y outdoor</span>{" "}
            en Talca
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Más de 170 productos para pesca, caza, buceo y camping.
            Las mejores marcas internacionales al mejor precio, con programa de puntos
            en cada compra.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/tienda">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ver Productos
              </Button>
            </Link>
            <a href="#contacto">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                Contactar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CATEGORÍAS ---
function CategoriesSection() {
  const categories = [
    { icon: Fish, title: "Pesca", description: "Cañas, carretes, señuelos, líneas, accesorios", count: "400+" },
    { icon: Target, title: "Caza", description: "Armas de aire, óptica, accesorios, munición", count: "50+" },
    { icon: Waves, title: "Buceo", description: "Waders, trajes, equipamiento", count: "30+" },
    { icon: Anchor, title: "Camping", description: "Carpas, sacos, cuchillería, outdoor", count: "100+" },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Nuestras Categorías</h2>
          <p className="mt-2 text-muted-foreground">
            Todo para tu próxima aventura al aire libre
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat.title} href="/tienda">
              <Card className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center py-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <cat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{cat.title}</h3>
                  <p className="mt-1 text-center text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-sm font-bold text-primary">
                    {cat.count} productos
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- HELPER: Product grid card ---
function formatCLP(n: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
}

function ProductGrid({
  title,
  subtitle,
  icon: Icon,
  products,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  products: typeof realProducts;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" />
              {title}
            </div>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <Link href="/tienda">
            <Button variant="outline" size="sm">
              Ver todo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} href={`/tienda/${product.id}`}>
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/40">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="truncate text-sm font-semibold">{product.name}</h3>
                  <p className="mt-1 text-lg font-bold text-primary">{formatCLP(product.price)}</p>
                  {product.points > 0 && (
                    <p className="mt-0.5 text-xs text-accent font-medium">
                      +{product.points} pts
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- MARCAS ---
function BrandsSection() {
  const brands = [
    "Shimano", "Rapala", "Daiwa", "Abu Garcia", "Penn", "Berkley",
    "Yo-Zuri", "Major Craft", "Okuma", "Blue Fox", "Pokee", "Kaiser",
    "Sufix", "Mustad", "DAM", "Gamo", "Victorinox",
  ];

  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Marcas de Confianza</h2>
          <p className="mt-2 text-muted-foreground">
            Trabajamos con las mejores marcas internacionales
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex h-12 items-center rounded-lg border bg-white px-5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- PROGRAMA DE PUNTOS ---
function PointsSection() {
  const steps = [
    { icon: ShoppingCart, title: "Compra", description: "Cada producto tiene puntos asignados. Ganas puntos con cada compra." },
    { icon: Star, title: "Acumula", description: "Tus puntos se suman automáticamente. Alcanza niveles Bronce, Plata y Oro." },
    { icon: Gift, title: "Canjea", description: "Usa tus puntos como descuento en tu próxima compra. 1 punto = $1 CLP." },
  ];

  const tiers = [
    { name: "Bronce", range: "0 - 4.999 pts", multiplier: "x1", color: "bg-amber-700" },
    { name: "Plata", range: "5.000 - 14.999 pts", multiplier: "x1.5", color: "bg-gray-400" },
    { name: "Oro", range: "15.000+ pts", multiplier: "x2", color: "bg-yellow-500" },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            <Trophy className="h-4 w-4" />
            Programa de Fidelización
          </div>
          <h2 className="text-3xl font-bold">Puntos Propezca</h2>
          <p className="mt-2 text-muted-foreground">
            Compra, acumula y canjea. Así de simple.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <step.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-1 text-sm font-medium text-accent">Paso {i + 1}</div>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="text-center">
              <CardContent className="py-6">
                <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${tier.color} text-white`}>
                  <Trophy className="h-5 w-5" />
                </div>
                <h4 className="font-bold">{tier.name}</h4>
                <p className="text-xs text-muted-foreground">{tier.range}</p>
                <p className="mt-2 text-lg font-bold text-primary">{tier.multiplier}</p>
                <p className="text-xs text-muted-foreground">multiplicador</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- NOSOTROS ---
function AboutSection() {
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Sobre Propezca</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Somos una tienda especializada en artículos de pesca, caza, buceo y camping
          ubicada en Talca, Región del Maule. Ofrecemos las mejores marcas internacionales
          con asesoría experta y un programa de puntos que premia tu fidelidad.
          Nuestro compromiso es entregar productos de calidad a los mejores precios
          para todos los amantes del outdoor.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-primary">170+</p>
            <p className="text-sm text-muted-foreground">Productos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">17+</p>
            <p className="text-sm text-muted-foreground">Marcas</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Talca</p>
            <p className="text-sm text-muted-foreground">Región del Maule</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CONTACTO ---
function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Contáctanos</h2>
          <p className="mt-2 text-muted-foreground">
            Estamos para ayudarte con lo que necesites
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center py-6">
              <MapPin className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">Dirección</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                2 Norte #2541<br />Talca, Región del Maule
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center py-6">
              <Phone className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">Teléfono</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                +56 9 4200 7775
              </p>
              <a
                href="https://wa.me/56942007775"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center py-6">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">Horarios</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Lun - Vie: 10:00 - 19:00<br />
                Sáb: 10:00 - 14:00
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// --- FAQ ---
function FaqSection() {
  const faqs = [
    {
      question: "¿Hacen envíos a todo Chile?",
      answer: "Sí, realizamos envíos a todo Chile a través de distintas empresas de transporte. El despacho tiene un costo de $5.990 o puedes retirar gratis en nuestra tienda en Talca.",
    },
    {
      question: "¿Cómo funciona el programa de puntos?",
      answer: "Cada producto tiene puntos asignados que se acreditan automáticamente al completar tu compra. Puedes canjear tus puntos como descuento en futuras compras. 1 punto = $1 CLP.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos transferencia bancaria. Al confirmar tu pedido, recibirás los datos para realizar el depósito y enviar el comprobante.",
    },
    {
      question: "¿Los productos tienen garantía?",
      answer: "Sí, todos nuestros productos cuentan con garantía del fabricante. Si tienes algún problema, contáctanos por WhatsApp y te ayudaremos.",
    },
    {
      question: "¿Puedo retirar en tienda?",
      answer: "Sí, puedes seleccionar retiro en tienda al momento del checkout. Nuestra dirección es 2 Norte #2541, Talca. Te avisaremos cuando tu pedido esté listo.",
    },
  ];

  return (
    <section className="border-t bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
        </div>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// --- CTA FINAL ---
function CtaSection() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Fish className="mx-auto mb-4 h-12 w-12 text-white/60" />
        <h2 className="text-3xl font-bold text-white">
          ¿Listo para tu próxima aventura?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Explora nuestro catálogo completo y aprovecha los puntos en cada compra.
        </p>
        <Link href="/tienda">
          <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-white">
            Explorar Tienda
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductGrid
        title="Más Vendidos"
        subtitle="Los favoritos de nuestros clientes"
        icon={Flame}
        products={bestSellers}
      />
      <ProductGrid
        title="Nuevos"
        subtitle="Últimas novedades en nuestra tienda"
        icon={Sparkles}
        products={newArrivals}
      />
      <BrandsSection />
      <PointsSection />
      <AboutSection />
      <ContactSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
