import { redirect } from "next/navigation";
import { obterUsuarioAtual } from "@/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const usuario = await obterUsuarioAtual();
  if (!usuario || usuario.tipo !== "administrador") redirect("/");
  return <>{children}</>;
}
