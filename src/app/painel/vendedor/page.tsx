import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { listarMeusVeiculos } from "@/actions/veiculos";
import { obterUsuarioAtual } from "@/actions/auth";
import { formatarPreco } from "@/lib/utils";
import { ExcluirVeiculoButton } from "./excluir-veiculo-button";
import type { VeiculoComImagens } from "@/lib/types";

export default async function MeusVeiculosPage() {
  const [veiculos, usuario] = await Promise.all([
    listarMeusVeiculos() as Promise<VeiculoComImagens[]>,
    obterUsuarioAtual(),
  ]);

  const emEstoque = veiculos.filter((v) => v.ativo && !v.vendido);
  const valorEstoque = emEstoque.reduce((soma, v) => soma + (v.preco ?? 0), 0);
  const vendidos = veiculos.filter((v) => v.vendido).length;
  const destaques = veiculos.filter((v) => v.destaque).length;

  const primeiroNome = usuario?.nome?.split(" ")[0] ?? "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Olá{primeiroNome ? `, ${primeiroNome}` : ""}</h1>
        <p className="text-muted-foreground text-sm mt-1">Bem-vindo ao painel da Ernani Veículos</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Em estoque</p>
              <p className="text-2xl font-bold text-primary mt-1">{emEstoque.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Valor em estoque</p>
              <p className="text-2xl font-bold mt-1">{formatarPreco(valorEstoque)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Em destaque</p>
              <p className="text-2xl font-bold mt-1">{destaques}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Vendidos</p>
              <p className="text-2xl font-bold mt-1">{vendidos}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Meus veículos</h2>
        <Button asChild>
          <Link href="/painel/vendedor/veiculos/novo"><Plus className="h-4 w-4" /> Novo veículo</Link>
        </Button>
      </div>

      {!veiculos.length ? (
        <p className="text-muted-foreground">Você ainda não cadastrou nenhum veículo.</p>
      ) : (
        <div className="space-y-3">
          {veiculos.map((v) => {
            const imagem = [...(v.imagens_veiculos ?? [])].sort((a, b) => a.ordem - b.ordem)[0];
            return (
              <Card key={v.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                    {imagem && <Image src={imagem.url_imagem} alt="" fill className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{v.nome ?? `${v.marca} ${v.modelo}`}</p>
                    <p className="text-sm text-muted-foreground">{formatarPreco(v.preco)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {v.destaque && <Badge>Destaque</Badge>}
                    {!v.ativo && <Badge variant="secondary">Inativo</Badge>}
                    {v.vendido && <Badge variant="destructive">Vendido</Badge>}
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/painel/vendedor/veiculos/${v.id}/editar`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <ExcluirVeiculoButton id={v.id} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
