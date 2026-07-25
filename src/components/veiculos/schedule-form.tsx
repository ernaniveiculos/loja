"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { agendamentoSchema, type AgendamentoInput } from "@/lib/validations/agendamento";
import { criarAgendamento } from "@/actions/agendamentos";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ScheduleForm({ veiculoId }: { veiculoId: string }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<AgendamentoInput>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: { data: "", horario: "", observacoes: "" },
  });

  function onSubmit(valores: AgendamentoInput) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(valores).forEach(([k, v]) => formData.set(k, v ?? ""));
      const resultado = await criarAgendamento(veiculoId, formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Visita agendada com sucesso!");
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="data" render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="horario" render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl><Input type="time" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="observacoes" render={({ field }) => (
          <FormItem>
            <FormLabel>Observações (opcional)</FormLabel>
            <FormControl><Textarea rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Agendando..." : "Agendar visita"}
        </Button>
      </form>
    </Form>
  );
}
