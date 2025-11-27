"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerLocation, setRegisterLocation] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const { login, register } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      setMessage("Por favor, preencha todos os campos.")
      setMessageType("error")
      return
    }

    if (login(loginEmail, loginPassword)) {
      setMessage("Login realizado com sucesso! Redirecionando...")
      setMessageType("success")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } else {
      setMessage("Email ou senha incorretos.")
      setMessageType("error")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword || !registerLocation) {
      setMessage("Por favor, preencha todos os campos.")
      setMessageType("error")
      return
    }
    if (registerPassword !== confirmPassword) {
      setMessage("As senhas não conferem.")
      setMessageType("error")
      return
    }

    if (register(registerName, registerEmail, registerPassword, registerLocation)) {
      setMessage("Cadastro realizado com sucesso! Redirecionando...")
      setMessageType("success")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } else {
      setMessage("Este email já está cadastrado.")
      setMessageType("error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Já tenho conta</TabsTrigger>
              <TabsTrigger value="register">Criar nova conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Teste: joao@email.com / senha123</p>
                  <p>Teste: maria@email.com / senha123</p>
                  <p>Teste: ana@email.com / senha123</p>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nome Completo</label>
                  <Input
                    type="text"
                    placeholder="João Silva"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Localização</label>
                  <Input
                    type="text"
                    placeholder="São Paulo, SP"
                    value={registerLocation}
                    onChange={(e) => setRegisterLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirmar Senha</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {message && (
            <div
              className={`mt-4 p-3 rounded text-sm text-center ${
                messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
