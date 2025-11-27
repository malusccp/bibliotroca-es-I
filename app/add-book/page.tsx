"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Upload, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

const genres = ["Romance", "Ficção Científica", "Fantasia", "Mistério", "Técnico", "Biografia", "Poesia", "História"]
const conditions = ["Novo", "Seminovo", "Usado", "Com anotações"]

export default function AddBookPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publisher, setPublisher] = useState("")
  const [genre, setGenre] = useState("")
  const [condition, setCondition] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user]) // removing router from dependency array to prevent infinite loops

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !author || !genre || !condition) {
      setMessage("Por favor, preencha todos os campos obrigatórios.")
      return
    }
    setMessage("Livro publicado com sucesso!")
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-primary hover:underline mb-6 inline-block">
            ← Voltar ao Dashboard
          </Link>

          <Card className="p-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Adicionar Novo Livro</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Foto da Capa</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors">
                  {image ? (
                    <div className="space-y-3">
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-48 object-cover mx-auto rounded"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setImage(null)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm font-medium">Clique para fazer upload ou arraste um arquivo</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Título *</label>
                  <Input placeholder="Ex: 1984" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Autor *</label>
                  <Input placeholder="Ex: George Orwell" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Editora</label>
                  <Input
                    placeholder="Ex: Penguin Books"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Gênero *</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Selecione um gênero</option>
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estado de Conservação *</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Selecione o estado</option>
                  {conditions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  placeholder="Adicione detalhes sobre o livro, como anotações, marcações, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Publicar Livro
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancelar
                  </Button>
                </Link>
              </div>

              {message && <div className="p-4 bg-green-100 text-green-700 rounded">{message}</div>}
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
