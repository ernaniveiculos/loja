import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { formatarPreco } from "@/lib/utils";
import type { VeiculoComImagens } from "@/lib/types";

export default async function VeiculosAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("veiculos")
    .select("*, imagens_veiculos(*), usuarios(nome, email)")
    .order("criado_em", { ascending: false });
  const veiculos = (data ?? []) as unknown as (VeiculoComImagens & { usuarios: { nome: string; email: string } | null })[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todos os veículos</h1>
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
                  <p className="text-xs text-muted-foreground">Vendedor: {v.usuarios?.nome ?? "-"}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {v.destaque && <Badge>Destaque</Badge>}
                  {!v.ativo && <Badge variant="secondary">Inativo</Badge>}
                  {v.vendido && <Badge variant="destructive">Vendido</Badge>}
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/painel/vendedor/veiculos/${v.id}/editar`}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
