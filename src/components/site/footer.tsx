export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} ErnaniVeículos. Todos os direitos reservados.</p>
        <p>Feito com Next.js, Supabase e muito cuidado.</p>
      </div>
    </footer>
  );
}
