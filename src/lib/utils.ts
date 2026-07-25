import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarPreco(valor: number | null | undefined) {
  if (valor === null || valor === undefined) return "Consulte";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatarQuilometragem(km: number | null | undefined) {
  if (km === null || km === undefined) return "-";
  return `${new Intl.NumberFormat("pt-BR").format(km)} km`;
}

export function formatarData(data: string | null | undefined) {
  if (!data) return "-";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
}

export function iniciais(nome: string | null | undefined) {
  if (!nome) return "?";
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
