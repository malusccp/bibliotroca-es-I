"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Star, BookOpen, Send, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth, getUserBooks } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [userBooks, setUserBooks] = useState([])
  const [receivedRequests] = useState([
    {
      id: 1,
      requester: "Ana Silva",
      book: "A Metamorfose",
      message: "Tenho disponível 'Ainda Estou Aqui'",
      status: "Pendente",
    },
    {
      id: 2,
      requester: "Carlos Costa",
      book: "Crime e Castigo",
      message: "Tenho 'Violet Bent Backwards Over The Grass'",
      status: "Pendente",
    },
  ])

  const [sentRequests] = useState([
    { id: 1, book: "Vidas Secas", owner: "Maria Santos", status: "Aceito" },
    { id: 2, book: "O Anticristo", owner: "João Oliveira", status: "Pendente" },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    setUserBooks(getUserBooks(user.id))
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Summary */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src={user.profileImage || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
              <div className="flex gap-4 mb-3 text-sm text-muted-foreground">
                <span>{user.location}</span>
                <span>Membro desde {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(user.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{user.rating}</span>
                <span className="text-muted-foreground">({user.totalTrades} trocas)</span>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Link href="/add-book">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex gap-2">
                  <Plus className="h-5 w-5" />
                  Adicionar Livro
                </Button>
              </Link>
              <Link href="/trades">
                <Button variant="outline" className="flex gap-2 bg-transparent">
                  <RefreshCw className="h-5 w-5" />
                  Minhas Trocas
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="myBooks" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="myBooks" className="flex gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Meus Livros</span>
                <span className="sm:hidden">Livros</span>
              </TabsTrigger>
              <TabsTrigger value="received" className="flex gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Solicitações Recebidas</span>
                <span className="sm:hidden">Recebidas</span>
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Minhas Solicitações</span>
                <span className="sm:hidden">Enviadas</span>
              </TabsTrigger>
            </TabsList>

            {/* My Books */}
            <TabsContent value="myBooks">
              <div className="grid gap-4">
                {userBooks && userBooks.length > 0 ? (
                  userBooks.map((book) => (
                    <Card
                      key={book.id}
                      className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                        <div className="flex gap-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{book.status}</Badge>
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{book.condition}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                          Editar
                        </Button>
                        <Button variant="destructive" className="flex-1 sm:flex-none">
                          Excluir
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">Você ainda não tem nenhum livro cadastrado.</p>
                    <Link href="/add-book" className="mt-4 inline-block">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Adicionar Livro
                      </Button>
                    </Link>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Received Requests */}
            <TabsContent value="received">
              <div className="grid gap-4">
                {receivedRequests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="mb-3">
                      <p className="font-semibold text-foreground">{request.requester} quer trocar por</p>
                      <p className="text-primary font-medium">{request.book}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">"{request.message}"</p>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Aceitar</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Recusar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sent Requests */}
            <TabsContent value="sent">
              <div className="grid gap-4">
                {sentRequests.map((request) => (
                  <Card key={request.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{request.book}</p>
                      <p className="text-sm text-muted-foreground">com {request.owner}</p>
                    </div>
                    <Badge
                      className={
                        request.status === "Aceito"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {request.status}
                    </Badge>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
