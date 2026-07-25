import { notFound } from "next/navigation";
import { obterVeiculo } from "@/actions/veiculos";
import { VehicleForm } from "@/components/veiculos/vehicle-form";
import { ImageUploader } from "@/components/veiculos/image-uploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VeiculoComImagens } from "@/lib/types";

export default async function EditarVeiculoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let veiculo: VeiculoComImagens;
  try {
    veiculo = (await obterVeiculo(id)) as VeiculoComImagens;
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">Editar veículo</h1>
        <VehicleForm veiculo={veiculo} />
      </div>

      <Card>
        <CardHeader><CardTitle>Fotos do veículo</CardTitle></CardHeader>
        <CardContent>
          <ImageUploader veiculoId={veiculo.id} imagens={veiculo.imagens_veiculos ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
