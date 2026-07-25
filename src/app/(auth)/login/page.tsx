"use client";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { entrar } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", senha: "" } });

  function onSubmit(valores: LoginInput) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", valores.email);
      formData.set("senha", valores.senha);
      const resultado = await entrar(formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Login realizado com sucesso");
      router.push(searchParams.get("redirect") || "/");
      router.refresh();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Acesse sua conta para favoritar veículos, agendar visitas e gerenciar anúncios.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="senha" render={({ field }) => (
              <FormItem><FormLabel>Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex justify-end text-sm">
              <Link href="/recuperar-senha" className="text-primary hover:underline">Esqueci minha senha</Link>
            </div>
            <Button type="submit" className="w-full" disabled={pending}>{pending ? "Entrando..." : "Entrar"}</Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Não tem conta? <Link href="/cadastro" className="text-primary hover:underline">Cadastre-se</Link>
        </p>
      </CardContent>
    </Card>
  );
}
