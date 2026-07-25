import { notFound } from "next/navigation";
import { obterVeiculo } from "@/actions/veiculos";
import { ehFavorito } from "@/actions/favoritos";
import { VehicleGallery } from "@/components/veiculos/vehicle-gallery";
import { ShareButton } from "@/components/veiculos/share-button";
import { FavoriteButton } from "@/components/veiculos/favorite-button";
import { ContactForm } from "@/components/veiculos/contact-form";
import { ScheduleForm } from "@/components/veiculos/schedule-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatarPreco, formatarQuilometragem } from "@/lib/utils";
import type { VeiculoComImagens } from "@/lib/types";

export default async function VeiculoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let veiculo: VeiculoComImagens;
  try {
    veiculo = (await obterVeiculo(id)) as VeiculoComImagens;
  } catch {
    notFound();
  }
  const favoritado = await ehFavorito(id);

  const specs: Array<[string, string | number | null | undefined]> = [
    ["Marca", veiculo.marca],
    ["Modelo", veiculo.modelo],
    ["Ano", veiculo.ano],
    ["Cor", veiculo.cor],
    ["Placa", veiculo.placa],
    ["Quilometragem", formatarQuilometragem(veiculo.quilometragem)],
    ["Combustível", veiculo.combustivel],
    ["Câmbio", veiculo.cambio],
    ["Cidade", veiculo.cidade],
    ["Estado", veiculo.estado],
  ];

  return (
    <div className="container py-10 grid lg:grid-cols-[1fr_360px] gap-10">
      <div>
        <VehicleGallery imagens={veiculo.imagens_veiculos ?? []} nome={veiculo.nome ?? veiculo.modelo} />

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {veiculo.destaque && <Badge>Destaque</Badge>}
              {veiculo.vendido && <Badge variant="destructive">Vendido</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              {veiculo.nome ?? `${veiculo.marca} ${veiculo.modelo}`}
            </h1>
            <p className="text-3xl font-extrabold text-primary mt-2">{formatarPreco(veiculo.preco)}</p>
          </div>
          <div className="flex gap-2">
            <FavoriteButton veiculoId={veiculo.id} favoritadoInicial={favoritado} />
            <ShareButton titulo={veiculo.nome ?? veiculo.modelo} />
          </div>
        </div>

        <Separator className="my-6" />

        <h2 className="text-lg font-semibold mb-3">Especificações</h2>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {specs.filter(([, v]) => v !== null && v !== undefined && v !== "").map(([label, valor]) => (
            <div key={label}>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium">{valor}</dd>
            </div>
          ))}
        </dl>

        {veiculo.descricao && (
          <>
            <Separator className="my-6" />
            <h2 className="text-lg font-semibold mb-3">Descrição</h2>
            <p className="text-muted-foreground whitespace-pre-line">{veiculo.descricao}</p>
          </>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Fale com o vendedor</CardTitle></CardHeader>
          <CardContent><ContactForm veiculoId={veiculo.id} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Agendar visita / test-drive</CardTitle></CardHeader>
          <CardContent><ScheduleForm veiculoId={veiculo.id} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
