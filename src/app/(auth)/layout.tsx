import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8">
        <Car className="h-6 w-6 text-primary" /> ErnaniVeículos
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
