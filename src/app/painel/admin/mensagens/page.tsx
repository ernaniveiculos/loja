import { listarMensagensDoVendedor } from "@/actions/mensagens";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatarData } from "@/lib/utils";

export default async function MensagensAdminPage() {
  const mensagens = await listarMensagensDoVendedor();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todas as mensagens</h1>
      <div className="space-y-3">
        {mensagens.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{m.nome} &middot; {m.email}</p>
                  {m.veiculos && (
                    <p className="text-sm text-muted-foreground">
                      Sobre: {(m.veiculos as any).nome ?? `${(m.veiculos as any).marca} ${(m.veiculos as any).modelo}`}
                    </p>
                  )}
                </div>
                <Badge variant={m.respondida ? "success" : "secondary"}>{m.respondida ? "Respondida" : "Pendente"}</Badge>
              </div>
              <p className="mt-3 text-sm">{m.mensagem}</p>
              <p className="mt-2 text-xs text-muted-foreground">{formatarData(m.criado_em)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
