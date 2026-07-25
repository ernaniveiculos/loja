import { listarTodasNotificacoes } from "@/actions/notificacoes";
import { listarUsuarios } from "@/actions/usuarios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatarData } from "@/lib/utils";
import { NovaNotificacaoForm } from "./nova-notificacao-form";

export default async function NotificacoesAdminPage() {
  const [notificacoes, usuarios] = await Promise.all([listarTodasNotificacoes(), listarUsuarios()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">Notificações</h1>
        <Card>
          <CardContent className="p-4">
            <NovaNotificacaoForm usuarios={usuarios.map((u) => ({ id: u.id, nome: u.nome, email: u.email }))} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {notificacoes.map((n) => (
          <Card key={n.id}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{n.titulo}</p>
                {n.descricao && <p className="text-sm text-muted-foreground">{n.descricao}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Para: {(n as any).usuarios?.nome ?? "-"} &middot; {formatarData(n.criado_em)}
                </p>
              </div>
              <Badge variant={n.lida ? "secondary" : "default"}>{n.lida ? "Lida" : "Não lida"}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
