"use client";
import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { alternarFavorito } from "@/actions/favoritos";

export function FavoriteButton({ veiculoId, favoritadoInicial }: { veiculoId: string; favoritadoInicial: boolean }) {
  const [favoritado, setFavoritado] = useState(favoritadoInicial);
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className="h-9 w-9 rounded-full shadow"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const resultado = await alternarFavorito(veiculoId);
          if (resultado.erro) {
            toast.error(resultado.erro);
            return;
          }
          setFavoritado(resultado.favoritado);
          toast.success(resultado.favoritado ? "Adicionado aos favoritos" : "Removido dos favoritos");
        });
      }}
      aria-label="Favoritar"
    >
      <Heart className={cn("h-4 w-4", favoritado && "fill-red-500 text-red-500")} />
    </Button>
  );
}
