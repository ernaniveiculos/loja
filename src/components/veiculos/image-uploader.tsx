"use client";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enviarImagensVeiculo, excluirImagemVeiculo } from "@/actions/imagens";
import type { ImagemVeiculo } from "@/lib/types";
import Image from "next/image";

export function ImageUploader({ veiculoId, imagens }: { veiculoId: string; imagens: ImagemVeiculo[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [lista, setLista] = useState(imagens);

  function enviar(files: FileList | null) {
    if (!files || !files.length) return;
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("imagens", f));
    startTransition(async () => {
      const resultado = await enviarImagensVeiculo(veiculoId, formData);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      toast.success("Imagens enviadas com sucesso");
      if (inputRef.current) inputRef.current.value = "";
    });
  }

  function remover(id: string) {
    startTransition(async () => {
      const resultado = await excluirImagemVeiculo(id, veiculoId);
      if (resultado.erro) {
        toast.error(resultado.erro);
        return;
      }
      setLista((atual) => atual.filter((img) => img.id !== id));
      toast.success("Imagem removida");
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {lista.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border group">
            <Image src={img.url_imagem} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => remover(img.id)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remover imagem"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-dashed text-muted-foreground hover:bg-muted"
        >
          <ImagePlus className="h-5 w-5" />
          <span className="text-xs">{pending ? "Enviando..." : "Adicionar"}</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => enviar(e.target.files)}
      />
    </div>
  );
}
