"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { criarNotificacao } from "@/actions/notificacoes";

type Usuario = { id: string; nome: string; email: string };
type Valores = { usuarioId: string; titulo: string; descricao: string };

export function NovaNotificacaoForm({ usuarios }: { usuarios: Usuario[] }) {
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, setValue, watch, reset } = useForm<Valores>({
    defaultValues: { usuarioId: "", titulo: "", descricao: "" },
  });
  const usuarioId = watch("usuarioId");

  function onSubmit(valores: Valores) {
    if (!valores.usuarioId) {
      toast.error("Selecione um usuário");
      return;
    }
    startTransition(async () => {
      const resultado = await criarNotificacao(valores.usuarioId, valores.titulo, valores.descricao);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Notificação enviada");
      reset();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto] items-start">
      <Select value={usuarioId} onValueChange={(v) => setValue("usuarioId", v)}>
        <SelectTrigger><SelectValue placeholder="Usuário" /></SelectTrigger>
        <SelectContent>
          {usuarios.map((u) => <SelectItem key={u.id} value={u.id}>{u.nome} ({u.email})</SelectItem>)}
        </SelectContent>
      </Select>
      <Input placeholder="Título" {...register("titulo", { required: true })} />
      <Input placeholder="Descrição (opcional)" {...register("descricao")} />
      <Button type="submit" disabled={pending}>{pending ? "Enviando..." : "Enviar"}</Button>
    </form>
  );
}
