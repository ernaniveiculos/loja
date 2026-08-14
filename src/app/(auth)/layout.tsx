import { Logo } from "@/components/site/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Logo height={84} className="mb-8" />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
