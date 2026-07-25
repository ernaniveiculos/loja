"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { marcarNotificacaoLida } from "@/actions/notificacoes";

export function MarcarLidaButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() => startTransition(async () => {
        const r = await marcarNotificacaoLida(id);
        if (r.erro) toast.error(r.erro);
      })}
    >
      Marcar como lida
    </Button>
  );
}
