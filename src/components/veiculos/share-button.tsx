"use client";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ShareButton({ titulo }: { titulo: string }) {
  async function compartilhar() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, url });
      } catch {
        // usuário cancelou o compartilhamento
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência");
  }

  return (
    <Button type="button" variant="outline" onClick={compartilhar}>
      <Share2 className="h-4 w-4" /> Compartilhar
    </Button>
  );
}
