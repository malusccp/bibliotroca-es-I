"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, RefreshCw } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
          Troque seus livros favoritos
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Conecte-se com leitores apaixonados, compartilhe histórias e economize enquanto expande sua biblioteca.
        </p>

        <Link href="/register">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mb-12 text-lg px-8 py-6">
            Começar a Trocar Agora
          </Button>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <Users className="h-12 w-12 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground">2,500+</p>
            <p className="text-muted-foreground">Leitores Ativos</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <BookOpen className="h-12 w-12 text-accent mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground">15,000+</p>
            <p className="text-muted-foreground">Livros Disponíveis</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground">8,500+</p>
            <p className="text-muted-foreground">Trocas Realizadas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
