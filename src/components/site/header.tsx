import Link from "next/link";
import { Bell, Heart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Logo } from "@/components/site/logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { obterUsuarioAtual } from "@/actions/auth";
import { sair } from "@/actions/auth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { iniciais } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/busca", label: "Buscar veículos" },
  { href: "/consignacao", label: "Consignação" },
];

export async function Header() {
  const usuario = await obterUsuarioAtual();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo height={52} />

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link href="/favoritos" aria-label="Favoritos">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {usuario ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{iniciais(usuario.nome)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{usuario.nome}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(usuario.tipo === "vendedor" || usuario.tipo === "administrador") && (
                  <DropdownMenuItem asChild>
                    <Link href="/painel/vendedor">Painel do vendedor</Link>
                  </DropdownMenuItem>
                )}
                {usuario.tipo === "administrador" && (
                  <DropdownMenuItem asChild>
                    <Link href="/painel/admin">Painel do administrador</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/favoritos">Meus favoritos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notificacoes">
                    <Bell className="h-4 w-4" /> Notificações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={sair}>
                  <button type="submit" className="w-full text-left">
                    <DropdownMenuItem asChild>
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/login">
                <User className="h-4 w-4" /> Entrar
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle asChild>
                  <Logo height={30} />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4 text-sm font-medium">
                {links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/favoritos">Favoritos</Link>
                {!usuario && <Link href="/login">Entrar</Link>}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
