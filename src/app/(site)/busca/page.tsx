import { Suspense } from "react";
import { VehicleFilters } from "@/components/veiculos/vehicle-filters";
import { VehicleCard } from "@/components/veiculos/vehicle-card";
import { VehicleCardSkeleton } from "@/components/veiculos/vehicle-card-skeleton";
import { listarVeiculos } from "@/actions/veiculos";
import type { FiltroVeiculos } from "@/lib/validations/veiculo";
import type { VeiculoComImagens } from "@/lib/types";

async function Resultados({ filtros }: { filtros: FiltroVeiculos }) {
  const veiculos = (await listarVeiculos(filtros)) as VeiculoComImagens[];

  if (!veiculos.length) {
    return <p className="text-muted-foreground py-12 text-center">Nenhum veículo encontrado com esses filtros.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {veiculos.map((v) => <VehicleCard key={v.id} veiculo={v} />)}
    </div>
  );
}

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filtros: FiltroVeiculos = {
    q: params.q,
    marca: params.marca,
    cidade: params.cidade,
    estado: params.estado,
    combustivel: params.combustivel,
    cambio: params.cambio,
    precoMin: params.precoMin ? Number(params.precoMin) : undefined,
    precoMax: params.precoMax ? Number(params.precoMax) : undefined,
    ordenar: (params.ordenar as FiltroVeiculos["ordenar"]) ?? "recentes",
  };

  return (
    <div className="container py-10 grid md:grid-cols-[300px_1fr] gap-8">
      <div>
        <Suspense fallback={null}>
          <VehicleFilters />
        </Suspense>
      </div>
      <Suspense
        key={JSON.stringify(filtros)}
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <VehicleCardSkeleton key={i} />)}
          </div>
        }
      >
        <Resultados filtros={filtros} />
      </Suspense>
    </div>
  );
}
