"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { marcarMensagemRespondida } from "@/actions/mensagens";

export function MarcarRespondidaButton({ id, respondida }: { id: string; respondida: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const resultado = await marcarMensagemRespondida(id, !respondida);
          if (resultado.erro) {
            toast.error(resultado.erro);
            return;
          }
          toast.success(respondida ? "Marcada como pendente" : "Marcada como respondida");
        });
      }}
    >
      {respondida ? "Marcar pendente" : "Marcar respondida"}
    </Button>
  );
}
