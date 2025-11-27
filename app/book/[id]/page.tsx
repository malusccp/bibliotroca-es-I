"use client"

import { useState, use } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, MapPin, User } from "lucide-react"
import { getAllBooks } from "@/lib/auth-context"

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [requestSent, setRequestSent] = useState(false)
  const resolvedParams = use(params)

  const booksData = getAllBooks()

  const bookId = Number.parseInt(resolvedParams.id)
  console.log("[v0] Procurando livro com ID:", bookId)
  console.log(
    "[v0] IDs disponíveis:",
    booksData.map((b) => b.id),
  )

  const book = booksData.find((b) => b.id === bookId)

  console.log("[v0] Livro encontrado:", book?.title)

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="text-primary hover:underline mb-6 inline-block">
              ← Voltar
            </Link>
            <p className="text-lg text-muted-foreground">Livro não encontrado</p>
          </div>
        </main>
      </div>
    )
  }

  const handleRequestTrade = () => {
    setRequestSent(true)
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-primary hover:underline mb-6 inline-block">
            ← Voltar
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Image */}
            <div className="md:col-span-1">
              <img
                src={book.image || "/placeholder.svg"}
                alt={book.title}
                className="w-full rounded-lg shadow-lg object-cover aspect-[2/3]"
              />
            </div>

            {/* Book Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <Badge className="mb-3 bg-primary/20 text-primary hover:bg-primary/30">{book.genre}</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-2">{book.title}</h1>
                <p className="text-lg text-muted-foreground">{book.author}</p>
              </div>

              <Card className="p-6 bg-secondary/50">
                <h3 className="font-semibold text-foreground mb-4">Informações do Livro</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Editora</p>
                    <p className="text-foreground font-medium">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ano de Publicação</p>
                    <p className="text-foreground font-medium">{book.year}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ISBN</p>
                    <p className="text-foreground font-medium">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condição</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{book.condition}</Badge>
                  </div>
                </div>
              </Card>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Sinopse</h3>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>

              {/* Owner Card */}
              <Card className="p-6 border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Quem está anunciando
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">{book.owner.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      {book.owner.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.owner.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {book.owner.rating} ({book.owner.reviews} avaliações)
                    </span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Outros Livros
                  </Button>
                </div>
              </Card>

              {/* CTA */}
              <Button
                onClick={handleRequestTrade}
                disabled={requestSent}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
              >
                {requestSent ? "Solicitação Enviada!" : "Solicitar Troca"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
