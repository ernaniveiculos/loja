import { listarAgendamentos } from "@/actions/agendamentos";
import { Card, CardContent } from "@/components/ui/card";
import { formatarData } from "@/lib/utils";
import { StatusAgendamentoSelect } from "./status-select";

export default async function AgendamentosVendedorPage() {
  const agendamentos = await listarAgendamentos();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Agendamentos</h1>
      {!agendamentos.length ? (
        <p className="text-muted-foreground">Nenhum agendamento por enquanto.</p>
      ) : (
        <div className="space-y-3">
          {agendamentos.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {(a.veiculos as any)?.nome ?? `${(a.veiculos as any)?.marca} ${(a.veiculos as any)?.modelo}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(a.usuarios as any)?.nome} &middot; {(a.usuarios as any)?.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatarData(a.data)} às {a.horario}
                  </p>
                  {a.observacoes && <p className="text-sm mt-1">{a.observacoes}</p>}
                </div>
                <StatusAgendamentoSelect id={a.id} status={a.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
