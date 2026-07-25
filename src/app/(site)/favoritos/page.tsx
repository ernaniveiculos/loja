import { listarFavoritos } from "@/actions/favoritos";
import { VehicleCard } from "@/components/veiculos/vehicle-card";
import type { VeiculoComImagens } from "@/lib/types";

export default async function FavoritosPage() {
  const favoritos = await listarFavoritos();

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Meus favoritos</h1>
      {!favoritos.length ? (
        <p className="text-muted-foreground">Você ainda não favoritou nenhum veículo.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favoritos.map((f) => (
            <VehicleCard key={f.id} veiculo={f.veiculos as unknown as VeiculoComImagens} favoritado />
          ))}
        </div>
      )}
    </div>
  );
}
