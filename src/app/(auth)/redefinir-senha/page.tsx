"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { redefinirSenhaSchema, type RedefinirSenhaInput } from "@/lib/validations/auth";
import { redefinirSenha } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<RedefinirSenhaInput>({
    resolver: zodResolver(redefinirSenhaSchema),
    defaultValues: { senha: "", confirmarSenha: "" },
  });

  function onSubmit(valores: RedefinirSenhaInput) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("senha", valores.senha);
      formData.set("confirmarSenha", valores.confirmarSenha);
      const resultado = await redefinirSenha(formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Senha redefinida com sucesso");
      router.push("/login");
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>Escolha uma nova senha para sua conta.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="senha" render={({ field }) => (
              <FormItem><FormLabel>Nova senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="confirmarSenha" render={({ field }) => (
              <FormItem><FormLabel>Confirmar nova senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={pending}>{pending ? "Salvando..." : "Redefinir senha"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
