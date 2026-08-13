import { Car, Users, MessageSquare, CalendarClock, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { obterUsuarioAtual } from "@/actions/auth";
import { formatarPreco } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: veiculos },
    { count: usuarios },
    { count: mensagens },
    { count: agendamentos },
    { data: estoque },
    usuario,
  ] = await Promise.all([
    supabase.from("veiculos").select("*", { count: "exact", head: true }),
    supabase.from("usuarios").select("*", { count: "exact", head: true }),
    supabase.from("mensagens").select("*", { count: "exact", head: true }).eq("respondida", false),
    supabase.from("agendamentos").select("*", { count: "exact", head: true }).eq("status", "pendente"),
    supabase.from("veiculos").select("preco").eq("ativo", true).eq("vendido", false),
    obterUsuarioAtual(),
  ]);

  const valorEstoque = (estoque ?? []).reduce((soma, v) => soma + (v.preco ?? 0), 0);
  const primeiroNome = usuario?.nome?.split(" ")[0] ?? "";

  const cards = [
    { label: "Veículos cadastrados", value: veiculos ?? 0, icon: Car },
    { label: "Valor em estoque", value: formatarPreco(valorEstoque), icon: Wallet },
    { label: "Usuários", value: usuarios ?? 0, icon: Users },
    { label: "Mensagens pendentes", value: mensagens ?? 0, icon: MessageSquare },
    { label: "Agendamentos pendentes", value: agendamentos ?? 0, icon: CalendarClock },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Olá{primeiroNome ? `, ${primeiroNome}` : ""}</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Painel administrativo — Ernani Veículos</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent><p className="text-2xl font-bold">{c.value}</p></CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
