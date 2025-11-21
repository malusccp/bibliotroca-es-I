import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-background to-primary/10">
      <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Dê uma nova vida às suas histórias
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl md:text-2xl">
            A maior comunidade de troca de livros do Brasil. Renove sua estante sem gastar nada.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base sm:text-lg">
              Quero começar a trocar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Decorative stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">15k+</div>
              <div className="text-sm text-muted-foreground mt-1">Livros disponíveis</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">8k+</div>
              <div className="text-sm text-muted-foreground mt-1">Leitores ativos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">20k+</div>
              <div className="text-sm text-muted-foreground mt-1">Trocas realizadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
    </section>
  )
}
