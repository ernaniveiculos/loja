"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { mensagemSchema, type MensagemInput } from "@/lib/validations/mensagem";
import { enviarMensagem } from "@/actions/mensagens";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm({ veiculoId }: { veiculoId: string }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<MensagemInput>({
    resolver: zodResolver(mensagemSchema),
    defaultValues: { nome: "", email: "", telefone: "", mensagem: "" },
  });

  function onSubmit(valores: MensagemInput) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(valores).forEach(([k, v]) => formData.set(k, v ?? ""));
      const resultado = await enviarMensagem(veiculoId, formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Mensagem enviada! O vendedor entrará em contato.");
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="nome" render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="telefone" render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone (opcional)</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mensagem" render={({ field }) => (
          <FormItem>
            <FormLabel>Mensagem</FormLabel>
            <FormControl><Textarea rows={4} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Enviando..." : "Enviar mensagem"}
        </Button>
      </form>
    </Form>
  );
}
