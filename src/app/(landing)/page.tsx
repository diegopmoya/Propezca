// Landing page de Propezca Control
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Package,
  DollarSign,
  BarChart3,
  ShieldCheck,
  ClipboardCheck,
  TrendingUp,
  Upload,
  Search,
  LineChart,
} from "lucide-react";

// --- HERO ---
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Controla tu negocio de pesca y caza{" "}
            <span className="text-primary">con inteligencia de datos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Deja de adivinar márgenes y empieza a tomar decisiones con datos
            reales. Maestro de productos, costeo, inventario y alertas en un
            solo lugar.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Ver cómo funciona
              </Button>
            </a>
          </div>

          {/* Visual del dashboard */}
          <div className="mt-12 rounded-xl border bg-muted/30 p-4 shadow-lg">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="mx-auto h-16 w-16 mb-4 text-primary/40" />
                <p className="text-sm font-medium">Vista previa del Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CÓMO FUNCIONA ---
function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Carga tus datos",
      description:
        "Sube tus archivos de ventas, costos e inventario en CSV o Excel. Sin formatos complicados.",
    },
    {
      number: "2",
      icon: Search,
      title: "El sistema detecta brechas",
      description:
        "Identifica costos faltantes, SKUs sin mapear, vendedores duplicados y meses sin datos.",
    },
    {
      number: "3",
      icon: BarChart3,
      title: "Toma decisiones con datos reales",
      description:
        "Conoce tus márgenes reales, productos más rentables, alertas de reposición y calidad de datos.",
    },
  ];

  return (
    <section id="como-funciona" className="border-t bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Cómo Funciona</h2>
          <p className="mt-2 text-muted-foreground">
            Tres pasos para tener control real de tu negocio
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-1 text-sm font-medium text-primary">
                Paso {step.number}
              </div>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CARACTERÍSTICAS ---
function FeaturesSection() {
  const features = [
    {
      icon: Package,
      title: "Maestro de Productos",
      description:
        "Normaliza tu catálogo con matching inteligente. Unifica nombres, SKUs y sinónimos.",
    },
    {
      icon: DollarSign,
      title: "Costeo y Margen",
      description:
        "Margen real por producto, línea y categoría. Nunca más adivinar tu rentabilidad.",
    },
    {
      icon: ClipboardCheck,
      title: "Control de Inventario",
      description:
        "Rotación, cobertura y alertas de quiebre. Sabe qué reponer antes de que falte.",
    },
    {
      icon: ShieldCheck,
      title: "Calidad de Datos",
      description:
        "Score de calidad: % costos completos, ventas mapeadas y anomalías detectadas.",
    },
    {
      icon: BarChart3,
      title: "SOPs Operativos",
      description:
        "Checklists, validaciones y bitácora de cambios. Tu operación bajo control.",
    },
    {
      icon: TrendingUp,
      title: "Tablero Ejecutivo",
      description:
        "KPIs accionables, no solo números. Decisiones informadas en un vistazo.",
    },
  ];

  return (
    <section id="caracteristicas" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Todo lo que necesitas para controlar tu negocio
          </h2>
          <p className="mt-2 text-muted-foreground">
            Herramientas diseñadas para tiendas de pesca, caza y outdoor
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border shadow-sm">
              <CardContent className="pt-6">
                <feature.icon className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FAQ ---
function FaqSection() {
  const faqs = [
    {
      question: "¿Qué es Propezca Control?",
      answer:
        "Es una plataforma de inteligencia de datos diseñada para tiendas de pesca, caza y outdoor. Te permite controlar tu catálogo de productos, conocer tus márgenes reales y detectar problemas en tus datos antes de que afecten tu negocio.",
    },
    {
      question: "¿Necesito conocimientos técnicos para usarlo?",
      answer:
        "No. Solo necesitas subir tus archivos de ventas y costos en CSV o Excel. El sistema se encarga de analizar, detectar brechas y presentarte la información de forma clara.",
    },
    {
      question: "¿Mis datos están seguros?",
      answer:
        "Sí. Usamos cifrado de datos en tránsito y reposo. Cumplimos con la Ley 21.719 de Protección de Datos Personales de Chile. Cada empresa tiene sus datos completamente aislados.",
    },
    {
      question: "¿Puedo probarlo gratis?",
      answer:
        "Sí. Puedes crear una cuenta gratuita y empezar a cargar tus datos de inmediato. Te mostramos el valor de la plataforma con datos de ejemplo para que veas cómo funciona.",
    },
    {
      question: "¿Qué pasa si tengo datos desordenados o incompletos?",
      answer:
        "Ese es exactamente el problema que resolvemos. El sistema detecta costos faltantes, nombres inconsistentes, meses sin datos y vendedores duplicados. Te guía paso a paso para limpiar y completar tu información.",
    },
  ];

  return (
    <section id="faq" className="border-t bg-muted/30 py-16 sm:py-24">
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
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">
          ¿Listo para controlar tu negocio con datos reales?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Empieza hoy y descubre lo que tus números realmente dicen.
        </p>
        <Link href="/register">
          <Button size="lg" className="mt-8">
            Comenzar Gratis
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
      <HowItWorksSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
