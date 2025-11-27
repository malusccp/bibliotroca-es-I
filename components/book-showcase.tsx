"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllBooks } from "@/lib/auth-context"

export default function BookShowcase() {
  const books = getAllBooks()

  return (
    <section className="py-12 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Livros Disponíveis</h2>
        <p className="text-muted-foreground mb-12">Confira alguns dos livros que estão disponíveis para troca</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[2/3] overflow-hidden bg-muted">
                <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                <Badge className="mb-3 bg-primary/20 text-primary hover:bg-primary/30">{book.genre}</Badge>

                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Dono:</span> {book.owner.name}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Local:</span> {book.owner.location}
                  </p>
                </div>

                <Link href={`/book/${book.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
