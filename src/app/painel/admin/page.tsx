import { Car, Users, MessageSquare, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: veiculos }, { count: usuarios }, { count: mensagens }, { count: agendamentos }] = await Promise.all([
    supabase.from("veiculos").select("*", { count: "exact", head: true }),
    supabase.from("usuarios").select("*", { count: "exact", head: true }),
    supabase.from("mensagens").select("*", { count: "exact", head: true }).eq("respondida", false),
    supabase.from("agendamentos").select("*", { count: "exact", head: true }).eq("status", "pendente"),
  ]);

  const cards = [
    { label: "Veículos cadastrados", value: veiculos ?? 0, icon: Car },
    { label: "Usuários", value: usuarios ?? 0, icon: Users },
    { label: "Mensagens pendentes", value: mensagens ?? 0, icon: MessageSquare },
    { label: "Agendamentos pendentes", value: agendamentos ?? 0, icon: CalendarClock },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard administrativo</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent><p className="text-3xl font-bold">{c.value}</p></CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
