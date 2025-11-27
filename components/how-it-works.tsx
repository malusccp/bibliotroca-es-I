"use client"

import { BookOpen, Users, RefreshCw, ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: BookOpen,
      title: "Cadastre",
      description: "Adicione seus livros à plataforma com fotos e descrições.",
    },
    {
      icon: Users,
      title: "Conecte",
      description: "Encontre leitores interessados nos seus livros.",
    },
    {
      icon: RefreshCw,
      title: "Troque",
      description: "Combine trocas e comece a ler novos livros.",
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Como Funciona</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-6 mb-4 w-24 h-24 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && <ArrowRight className="h-6 w-6 text-primary mt-6 md:hidden" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
