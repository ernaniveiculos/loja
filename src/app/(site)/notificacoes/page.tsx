import { redirect } from "next/navigation";
import { obterUsuarioAtual } from "@/actions/auth";
import { listarNotificacoes } from "@/actions/notificacoes";
import { Card, CardContent } from "@/components/ui/card";
import { formatarData } from "@/lib/utils";
import { MarcarLidaButton } from "./marcar-lida-button";

export default async function NotificacoesPage() {
  const usuario = await obterUsuarioAtual();
  if (!usuario) redirect("/login?redirect=/notificacoes");

  const notificacoes = await listarNotificacoes();

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Notificações</h1>
      {!notificacoes.length ? (
        <p className="text-muted-foreground">Você não tem notificações.</p>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {notificacoes.map((n) => (
            <Card key={n.id} className={n.lida ? "opacity-70" : ""}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{n.titulo}</p>
                  {n.descricao && <p className="text-sm text-muted-foreground">{n.descricao}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{formatarData(n.criado_em)}</p>
                </div>
                {!n.lida && <MarcarLidaButton id={n.id} />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
