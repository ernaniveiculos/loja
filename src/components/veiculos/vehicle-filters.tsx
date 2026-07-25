"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const combustiveis = ["Flex", "Gasolina", "Diesel", "Híbrido", "Elétrico"];
const cambios = ["Manual", "Automático", "CVT", "Automatizado"];
const ordenacoes = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor_preco", label: "Menor preço" },
  { value: "maior_preco", label: "Maior preço" },
  { value: "menor_km", label: "Menor quilometragem" },
];

export function VehicleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  function aplicar(chave: string, valor: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (valor && valor !== "todos") params.set(chave, valor);
    else params.delete(chave);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function buscarTexto(e: React.FormEvent) {
    e.preventDefault();
    aplicar("q", q);
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <form onSubmit={buscarTexto} className="flex gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por marca, modelo ou título..."
          />
          <Button type="submit" size="icon" disabled={pending} aria-label="Buscar">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select onValueChange={(v) => aplicar("combustivel", v)} defaultValue={searchParams.get("combustivel") ?? "todos"}>
            <SelectTrigger><SelectValue placeholder="Combustível" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Combustível</SelectItem>
              {combustiveis.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => aplicar("cambio", v)} defaultValue={searchParams.get("cambio") ?? "todos"}>
            <SelectTrigger><SelectValue placeholder="Câmbio" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Câmbio</SelectItem>
              {cambios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input placeholder="Cidade" defaultValue={searchParams.get("cidade") ?? ""} onBlur={(e) => aplicar("cidade", e.target.value)} />

          <Select onValueChange={(v) => aplicar("ordenar", v)} defaultValue={searchParams.get("ordenar") ?? "recentes"}>
            <SelectTrigger><SelectValue placeholder="Ordenar por" /></SelectTrigger>
            <SelectContent>
              {ordenacoes.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input type="number" placeholder="Preço mínimo" defaultValue={searchParams.get("precoMin") ?? ""} onBlur={(e) => aplicar("precoMin", e.target.value)} />
          <Input type="number" placeholder="Preço máximo" defaultValue={searchParams.get("precoMax") ?? ""} onBlur={(e) => aplicar("precoMax", e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
