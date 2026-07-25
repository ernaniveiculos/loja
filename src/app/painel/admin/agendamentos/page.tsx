import { listarAgendamentos } from "@/actions/agendamentos";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatarData } from "@/lib/utils";

export default async function AgendamentosAdminPage() {
  const agendamentos = await listarAgendamentos();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todos os agendamentos</h1>
      <div className="space-y-3">
        {agendamentos.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">
                  {(a.veiculos as any)?.nome ?? `${(a.veiculos as any)?.marca} ${(a.veiculos as any)?.modelo}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(a.usuarios as any)?.nome} &middot; {formatarData(a.data)} às {a.horario}
                </p>
              </div>
              <Badge variant="outline">{a.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
