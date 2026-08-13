import { FinancingPartners } from "@/components/site/financing-partners";

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 space-y-8">
        <FinancingPartners />
        <div className="text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t">
          <p>&copy; {new Date().getFullYear()} Ernani Veículos. Todos os direitos reservados.</p>
          <p>Feito com Next.js, Supabase e muito cuidado.</p>
        </div>
      </div>
    </footer>
  );
}
