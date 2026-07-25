import { redirect } from "next/navigation";
import { obterUsuarioAtual } from "@/actions/auth";
import { Header } from "@/components/site/header";
import { PainelSidebar } from "@/components/painel/sidebar";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const usuario = await obterUsuarioAtual();
  if (!usuario) redirect("/login?redirect=/painel");
  if (usuario.tipo === "cliente") redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-8 flex flex-col md:flex-row gap-8">
        <PainelSidebar tipo={usuario.tipo === "administrador" ? "administrador" : "vendedor"} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
