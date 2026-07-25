import Image from "next/image";
import Link from "next/link";
import { Gauge, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatarPreco, formatarQuilometragem } from "@/lib/utils";
import type { VeiculoComImagens } from "@/lib/types";
import { FavoriteButton } from "./favorite-button";

export function VehicleCard({ veiculo, favoritado = false }: { veiculo: VeiculoComImagens; favoritado?: boolean }) {
  const imagemPrincipal = [...(veiculo.imagens_veiculos ?? [])].sort((a, b) => a.ordem - b.ordem)[0];

  return (
    <Card className="overflow-hidden group transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        <Link href={`/veiculos/${veiculo.id}`}>
          {imagemPrincipal ? (
            <Image
              src={imagemPrincipal.url_imagem}
              alt={veiculo.nome ?? `${veiculo.marca} ${veiculo.modelo}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
              Sem foto
            </div>
          )}
        </Link>
        {veiculo.destaque && (
          <Badge className="absolute left-2 top-2" variant="default">
            Destaque
          </Badge>
        )}
        {veiculo.vendido && (
          <Badge className="absolute left-2 top-2" variant="destructive">
            Vendido
          </Badge>
        )}
        <div className="absolute right-2 top-2">
          <FavoriteButton veiculoId={veiculo.id} favoritadoInicial={favoritado} />
        </div>
      </div>
      <CardContent className="p-4">
        <Link href={`/veiculos/${veiculo.id}`}>
          <h3 className="font-semibold leading-tight line-clamp-1">
            {veiculo.nome ?? `${veiculo.marca} ${veiculo.modelo}`}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {veiculo.marca} {veiculo.modelo} &middot; {veiculo.ano ?? "-"}
        </p>
        <p className="mt-2 text-xl font-bold text-primary">{formatarPreco(veiculo.preco)}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" /> {formatarQuilometragem(veiculo.quilometragem)}
          </span>
          {veiculo.cidade && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {veiculo.cidade}
              {veiculo.estado ? `/${veiculo.estado}` : ""}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/veiculos/${veiculo.id}`} className="text-sm font-medium text-primary hover:underline">
          Ver detalhes
        </Link>
      </CardFooter>
    </Card>
  );
}
