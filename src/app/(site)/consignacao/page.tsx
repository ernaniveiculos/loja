import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsignmentForm } from "@/components/site/consignment-form";
import { CheckCircle2 } from "lucide-react";

const VANTAGENS = [
  "Você não se preocupa em anunciar, negociar ou atender curiosos",
  "Cuidamos da divulgação, fotos profissionais e visitas",
  "Avaliação justa baseada no mercado atual",
  "Você só recebe quando o veículo é vendido",
  "Documentação e transferência com segurança",
];

export default function ConsignacaoPage() {
  return (
    <div className="container py-12 grid lg:grid-cols-[1fr_380px] gap-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consignação de veículos</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Deixe seu carro na Ernani Veículos e nós cuidamos de tudo: anúncio, fotos, negociação e
          documentação. Você define o valor mínimo e só recebe quando o veículo for vendido.
        </p>

        <div className="mt-8 space-y-3">
          {VANTAGENS.map((v) => (
            <div key={v} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Solicitar avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <ConsignmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
