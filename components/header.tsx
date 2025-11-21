import { BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">BiblioTroca</span>
        </div>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden flex-1 max-w-xl md:flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Buscar por título, autor ou gênero..." className="w-full pl-9" />
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" className="hidden sm:flex bg-transparent">
            Entrar
          </Button>
          <Button size="default">Cadastrar</Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-border/40 px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Buscar livros..." className="w-full pl-9" />
        </div>
      </div>
    </header>
  )
}
