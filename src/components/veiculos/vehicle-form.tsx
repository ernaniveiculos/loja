"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { veiculoSchema, type VeiculoInput } from "@/lib/validations/veiculo";
import { criarVeiculo, atualizarVeiculo } from "@/actions/veiculos";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Veiculo } from "@/lib/types";

export function VehicleForm({ veiculo }: { veiculo?: Veiculo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<VeiculoInput>({
    resolver: zodResolver(veiculoSchema),
    defaultValues: {
      nome: veiculo?.nome ?? "",
      marca: veiculo?.marca ?? "",
      modelo: veiculo?.modelo ?? "",
      ano: veiculo?.ano ?? new Date().getFullYear(),
      preco: veiculo?.preco ?? 0,
      cor: veiculo?.cor ?? "",
      placa: veiculo?.placa ?? "",
      quilometragem: veiculo?.quilometragem ?? 0,
      combustivel: veiculo?.combustivel ?? "",
      cambio: veiculo?.cambio ?? "",
      cidade: veiculo?.cidade ?? "",
      estado: veiculo?.estado ?? "",
      telefone: veiculo?.telefone ?? "",
      descricao: veiculo?.descricao ?? "",
      ativo: veiculo?.ativo ?? true,
      destaque: veiculo?.destaque ?? false,
      vendido: veiculo?.vendido ?? false,
    },
  });

  function onSubmit(valores: VeiculoInput) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(valores).forEach(([k, v]) => formData.set(k, String(v ?? "")));

      const resultado = veiculo
        ? await atualizarVeiculo(veiculo.id, formData)
        : await criarVeiculo(formData);

      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success(veiculo ? "Veículo atualizado" : "Veículo cadastrado");
      if (!veiculo && "veiculo" in resultado && resultado.veiculo) {
        router.push(`/painel/vendedor/veiculos/${resultado.veiculo.id}/editar`);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="nome" render={({ field }) => (
          <FormItem>
            <FormLabel>Título do anúncio</FormLabel>
            <FormControl><Input placeholder="Ex: Honda Civic EXL 2022 Impecável" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField control={form.control} name="marca" render={({ field }) => (
            <FormItem><FormLabel>Marca</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="modelo" render={({ field }) => (
            <FormItem><FormLabel>Modelo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="ano" render={({ field }) => (
            <FormItem><FormLabel>Ano</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="preco" render={({ field }) => (
            <FormItem><FormLabel>Preço (R$)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField control={form.control} name="cor" render={({ field }) => (
            <FormItem><FormLabel>Cor</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="placa" render={({ field }) => (
            <FormItem><FormLabel>Placa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="quilometragem" render={({ field }) => (
            <FormItem><FormLabel>Quilometragem</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="combustivel" render={({ field }) => (
            <FormItem><FormLabel>Combustível</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField control={form.control} name="cambio" render={({ field }) => (
            <FormItem><FormLabel>Câmbio</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="cidade" render={({ field }) => (
            <FormItem><FormLabel>Cidade</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="estado" render={({ field }) => (
            <FormItem><FormLabel>Estado</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="telefone" render={({ field }) => (
            <FormItem><FormLabel>Telefone de contato</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <FormField control={form.control} name="descricao" render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl><Textarea rows={5} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex flex-wrap gap-6">
          <FormField control={form.control} name="ativo" render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <FormLabel className="!mt-0">Anúncio ativo</FormLabel>
            </FormItem>
          )} />
          <FormField control={form.control} name="destaque" render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <FormLabel className="!mt-0">Destacar na home</FormLabel>
            </FormItem>
          )} />
          <FormField control={form.control} name="vendido" render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <FormLabel className="!mt-0">Marcar como vendido</FormLabel>
            </FormItem>
          )} />
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Salvando..." : veiculo ? "Salvar alterações" : "Cadastrar veículo"}
        </Button>
      </form>
    </Form>
  );
}
