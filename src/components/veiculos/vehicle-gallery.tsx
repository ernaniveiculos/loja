"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImagemVeiculo } from "@/lib/types";

export function VehicleGallery({ imagens, nome }: { imagens: ImagemVeiculo[]; nome: string }) {
  const ordenadas = [...imagens].sort((a, b) => a.ordem - b.ordem);
  const [ativa, setAtiva] = useState(0);

  if (!ordenadas.length) {
    return (
      <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        Sem fotos disponíveis
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image src={ordenadas[ativa].url_imagem} alt={nome} fill className="object-cover" priority />
      </div>
      {ordenadas.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {ordenadas.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setAtiva(i)}
              className={cn(
                "relative aspect-video overflow-hidden rounded-md border-2",
                i === ativa ? "border-primary" : "border-transparent"
              )}
            >
              <Image src={img.url_imagem} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
