"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogOut, UserIcon } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary whitespace-nowrap">
          <Image
            src="/bibliotroca-logo.png"
            alt="Logo BiblioTroca"
            width={32}
            height={32}
            className="object-contain"
          />
          BiblioTroca
        </Link>

        <div className="hidden md:flex flex-1 max-w-sm mx-auto">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Buscar livros, autores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-primary/20"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-2 ml-auto items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <span className="sm:hidden">Perfil</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}