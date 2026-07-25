import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/veiculos/vehicle-card";
import { VehicleCardSkeleton } from "@/components/veiculos/vehicle-card-skeleton";
import { listarDestaques, listarVeiculos } from "@/actions/veiculos";
import { Search } from "lucide-react";
import type { VeiculoComImagens } from "@/lib/types";

async function Destaques() {
  const destaques = (await listarDestaques()) as VeiculoComImagens[];
  if (!destaques.length) return null;

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-6">Veículos em destaque</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destaques.map((v) => (
          <VehicleCard key={v.id} veiculo={v} />
        ))}
      </div>
    </section>
  );
}

async function UltimosAnuncios() {
  const veiculos = ((await listarVeiculos({ ordenar: "recentes" })) as VeiculoComImagens[]).slice(0, 8);
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Últimos anúncios</h2>
        <Button variant="link" asChild><Link href="/busca">Ver todos</Link></Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {veiculos.map((v) => (
          <VehicleCard key={v.id} veiculo={v} />
        ))}
      </div>
    </section>
  );
}

function GradeSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <VehicleCardSkeleton key={i} />)}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Encontre o veículo ideal para você
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de anúncios verificados, com fotos, localização e contato direto com o vendedor.
          </p>
          <Button size="lg" asChild className="mt-8">
            <Link href="/busca"><Search className="h-4 w-4" /> Buscar veículos</Link>
          </Button>
        </div>
      </section>

      <Suspense fallback={<div className="container py-12"><GradeSkeleton /></div>}>
        <Destaques />
      </Suspense>
      <Suspense fallback={<div className="container py-12"><GradeSkeleton /></div>}>
        <UltimosAnuncios />
      </Suspense>
    </div>
  );
}
