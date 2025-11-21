import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function BookShowcase() {
  const books = [
    {
      title: "1984",
      author: "George Orwell",
      condition: "Seminovo",
      image: "/1984-book-cover.png",
    },
    {
      title: "O Hobbit",
      author: "J.R.R. Tolkien",
      condition: "Novo",
      image: "/hobbit-book-cover.png",
    },
    {
      title: "Cem Anos de Solidão",
      author: "Gabriel García Márquez",
      condition: "Seminovo",
      image: "/one-hundred-years-solitude-cover.png",
    },
    {
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      condition: "Novo",
      image: "/the-little-prince-book-cover.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Acabaram de chegar na estante
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja alguns dos livros recém-adicionados por nossa comunidade
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="aspect-[2/3] overflow-hidden bg-muted">
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant={book.condition === "Novo" ? "default" : "secondary"}>{book.condition}</Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
