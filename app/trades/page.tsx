"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { X, Truck, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function TradesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [trades] = useState([
    {
      id: 1,
      requestedBook: "O Anticristo",
      requestedFrom: "João Silva",
      offeredBook: "Vidas Secas",
      offeredBy: "Maria Santos",
      status: "Pendente",
      stage: 1,
      date: "15 de Novembro",
    },
    {
      id: 2,
      requestedBook: "Memórias Póstumas de Brás Cubas",
      requestedFrom: "Ana Costa",
      offeredBook: "A Hora da Estrela",
      offeredBy: "Ana Costa",
      status: "Aceito",
      stage: 2,
      date: "10 de Novembro",
    },
    {
      id: 3,
      requestedBook: "A Metamorfose",
      requestedFrom: "Carlos Mendes",
      offeredBook: "Crime e Castigo",
      offeredBy: "Carlos Mendes",
      status: "Em Trânsito",
      stage: 3,
      date: "05 de Novembro",
    },
    {
      id: 4,
      requestedBook: "O Mal-Estar na Civilização",
      requestedFrom: "Fernanda Lima",
      offeredBook: "A Morte de Ivan Ilitch",
      offeredBy: "Fernanda Lima",
      status: "Concluído",
      stage: 4,
      date: "01 de Novembro",
    },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  if (!user) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-700"
      case "Aceito":
        return "bg-blue-100 text-blue-700"
      case "Em Trânsito":
        return "bg-purple-100 text-purple-700"
      case "Concluído":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard" className="text-primary hover:underline mb-6 inline-block">
            ← Voltar ao Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Suas Trocas</h1>
          <p className="text-muted-foreground mb-8">Acompanhe o status de todas as suas trocas</p>

          <div className="grid gap-6">
            {trades.map((trade) => (
              <Card key={trade.id} className="p-6 hover:shadow-lg transition-shadow">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Progresso da Troca</span>
                    <Badge className={getStatusColor(trade.status)}>{trade.status}</Badge>
                  </div>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                            step <= trade.stage
                              ? "bg-primary text-primary-foreground"
                              : "bg-border text-muted-foreground"
                          }`}
                        >
                          {step === 1 && "✓"}
                          {step === 2 && "✓"}
                          {step === 3 && "📦"}
                          {step === 4 && "✓"}
                        </div>
                        {step < 4 && (
                          <div className={`flex-1 h-1 mx-1 ${step < trade.stage ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Solicitação</span>
                    <span>Aceito</span>
                    <span>Em Trânsito</span>
                    <span>Concluído</span>
                  </div>
                </div>

                {/* Trade Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Livro Desejado</p>
                    <p className="font-semibold text-foreground mb-1">{trade.requestedBook}</p>
                    <p className="text-sm text-muted-foreground">com {trade.requestedFrom}</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Livro Ofertado</p>
                    <p className="font-semibold text-foreground mb-1">{trade.offeredBook}</p>
                    <p className="text-sm text-muted-foreground">de {trade.offeredBy}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 text-sm border-t border-border pt-4">
                  <span className="text-muted-foreground">Solicitado em: {trade.date}</span>
                  {trade.status === "Pendente" && (
                    <div className="ml-auto flex gap-2">
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                  {trade.status === "Aceito" && (
                    <div className="ml-auto">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Truck className="h-4 w-4 mr-1" />
                        Marcar como Enviado
                      </Button>
                    </div>
                  )}
                  {trade.status === "Concluído" && (
                    <div className="ml-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="text-green-600 border-green-300 bg-green-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Troca Completa
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
