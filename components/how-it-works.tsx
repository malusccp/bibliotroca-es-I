import { Camera, Search, Handshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      icon: Camera,
      title: "1. Cadastre seus livros",
      description: "Tire uma foto, descreva o estado e disponibilize para a comunidade.",
    },
    {
      icon: Search,
      title: "2. Encontre sua próxima leitura",
      description: "Navegue pelo acervo de outros usuários e solicite uma troca.",
    },
    {
      icon: Handshake,
      title: "3. Combine a entrega",
      description: "Use nosso chat para combinar a troca em um local público próximo a você.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Trocar é fácil e rápido
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Em poucos passos você já estará trocando livros com a comunidade
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
