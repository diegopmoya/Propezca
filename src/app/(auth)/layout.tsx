// Layout para páginas de autenticación — identidad Propezca
import Link from "next/link";
import { Fish } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8">
      <Link href="/" className="mb-6 flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <Fish className="h-7 w-7" />
        </div>
        <span className="text-2xl font-bold text-primary">PROPEZCA</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
