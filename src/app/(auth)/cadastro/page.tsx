"use client";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cadastroSchema, type CadastroInput } from "@/lib/validations/auth";
import { cadastrar } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CadastroPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<CadastroInput>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: "", email: "", telefone: "", tipo: "cliente", senha: "", confirmarSenha: "" },
  });

  function onSubmit(valores: CadastroInput) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(valores).forEach(([k, v]) => formData.set(k, v ?? ""));
      const resultado = await cadastrar(formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
      router.push("/login");
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Cadastre-se para favoritar veículos, agendar visitas ou anunciar como vendedor.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="nome" render={({ field }) => (
              <FormItem><FormLabel>Nome completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="telefone" render={({ field }) => (
              <FormItem><FormLabel>Telefone (opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="tipo" render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de conta</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente (comprador)</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="senha" render={({ field }) => (
              <FormItem><FormLabel>Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="confirmarSenha" render={({ field }) => (
              <FormItem><FormLabel>Confirmar senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={pending}>{pending ? "Criando conta..." : "Criar conta"}</Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Já tem conta? <Link href="/login" className="text-primary hover:underline">Entrar</Link>
        </p>
      </CardContent>
    </Card>
  );
}
