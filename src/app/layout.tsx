import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Propezca Control — Inteligencia de datos para tu negocio",
  description:
    "Controla tu negocio de pesca y caza con inteligencia de datos. Maestro de productos, costeo, márgenes y calidad de datos.",
  openGraph: {
    title: "Propezca Control",
    description: "Controla tu negocio de pesca y caza con inteligencia de datos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
