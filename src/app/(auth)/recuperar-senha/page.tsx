"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { recuperarSenhaSchema, type RecuperarSenhaInput } from "@/lib/validations/auth";
import { solicitarRecuperacaoSenha } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RecuperarSenhaPage() {
  const [pending, startTransition] = useTransition();
  const form = useForm<RecuperarSenhaInput>({ resolver: zodResolver(recuperarSenhaSchema), defaultValues: { email: "" } });

  function onSubmit(valores: RecuperarSenhaInput) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", valores.email);
      const resultado = await solicitarRecuperacaoSenha(formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Enviamos um link de recuperação para o seu e-mail");
      form.reset();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>Informe seu e-mail para receber o link de redefinição de senha.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={pending}>{pending ? "Enviando..." : "Enviar link de recuperação"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
