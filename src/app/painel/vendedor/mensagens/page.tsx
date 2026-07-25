import { listarMensagensDoVendedor } from "@/actions/mensagens";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatarData } from "@/lib/utils";
import { MarcarRespondidaButton } from "./marcar-respondida-button";

export default async function MensagensVendedorPage() {
  const mensagens = await listarMensagensDoVendedor();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mensagens recebidas</h1>
      {!mensagens.length ? (
        <p className="text-muted-foreground">Nenhuma mensagem por enquanto.</p>
      ) : (
        <div className="space-y-3">
          {mensagens.map((m) => (
            <Card key={m.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{m.nome} &middot; {m.email}</p>
                    {m.telefone && <p className="text-sm text-muted-foreground">{m.telefone}</p>}
                    {m.veiculos && (
                      <p className="text-sm text-muted-foreground">
                        Sobre: {(m.veiculos as { nome: string | null; marca: string; modelo: string }).nome ?? `${(m.veiculos as any).marca} ${(m.veiculos as any).modelo}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={m.respondida ? "success" : "secondary"}>
                      {m.respondida ? "Respondida" : "Pendente"}
                    </Badge>
                    <MarcarRespondidaButton id={m.id} respondida={m.respondida} />
                  </div>
                </div>
                <p className="mt-3 text-sm">{m.mensagem}</p>
                <p className="mt-2 text-xs text-muted-foreground">{formatarData(m.criado_em)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
