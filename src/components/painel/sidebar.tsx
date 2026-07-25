"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Car, MessageSquare, CalendarClock, Users, Bell } from "lucide-react";

const itensVendedor = [
  { href: "/painel/vendedor", label: "Meus veículos", icon: Car },
  { href: "/painel/vendedor/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/painel/vendedor/agendamentos", label: "Agendamentos", icon: CalendarClock },
];

const itensAdmin = [
  { href: "/painel/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/painel/admin/veiculos", label: "Veículos", icon: Car },
  { href: "/painel/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/painel/admin/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/painel/admin/agendamentos", label: "Agendamentos", icon: CalendarClock },
  { href: "/painel/admin/notificacoes", label: "Notificações", icon: Bell },
];

export function PainelSidebar({ tipo }: { tipo: "vendedor" | "administrador" }) {
  const pathname = usePathname();
  const itens = tipo === "administrador" ? itensAdmin : itensVendedor;

  return (
    <aside className="w-full md:w-56 shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {itens.map((item) => {
          const Icon = item.icon;
          const ativo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                ativo ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
