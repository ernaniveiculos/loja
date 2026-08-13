import { cn } from "@/lib/utils";

const PARCEIROS = ["BV Financeira", "Santander", "Itaú", "Panamericano", "Omni", "C6 Bank"];

export function FinancingPartners({ className, titulo = "Financiamento com parceiros" }: { className?: string; titulo?: string }) {
  return (
    <div className={cn("", className)}>
      <p className="text-xs font-medium text-muted-foreground mb-2">{titulo}</p>
      <div className="flex flex-wrap gap-2">
        {PARCEIROS.map((nome) => (
          <span
            key={nome}
            className="text-xs font-medium px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border"
          >
            {nome}
          </span>
        ))}
      </div>
    </div>
  );
}
