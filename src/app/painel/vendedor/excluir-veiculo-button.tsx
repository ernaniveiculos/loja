"use client";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { excluirVeiculo } from "@/actions/veiculos";

export function ExcluirVeiculoButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={pending}
      onClick={() => {
        if (!confirm("Tem certeza que deseja excluir este veículo?")) return;
        startTransition(async () => {
          const resultado = await excluirVeiculo(id);
          if (resultado.erro) {
            toast.error(resultado.erro);
            return;
          }
          toast.success("Veículo excluído");
        });
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
