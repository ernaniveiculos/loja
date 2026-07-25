"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { atualizarTipoUsuario } from "@/actions/usuarios";

const tipos = [
  { value: "cliente", label: "Cliente" },
  { value: "vendedor", label: "Vendedor" },
  { value: "administrador", label: "Administrador" },
];

export function TipoUsuarioSelect({ id, tipo }: { id: string; tipo: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Select
      defaultValue={tipo}
      disabled={pending}
      onValueChange={(valor) => {
        startTransition(async () => {
          const resultado = await atualizarTipoUsuario(id, valor);
          if (resultado.erro) {
            toast.error(resultado.erro);
            return;
          }
          toast.success("Tipo de usuário atualizado");
        });
      }}
    >
      <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
      <SelectContent>
        {tipos.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
