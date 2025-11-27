"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">BiblioTroca</h3>
            <p className="text-sm opacity-90">
              Conectando leitores apaixonados em uma comunidade global de troca de livros.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="opacity-90 hover:opacity-100">
                  Navegar Livros
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="opacity-90 hover:opacity-100">
                  Meu Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100">
                  Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-90 hover:opacity-100">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="opacity-90 hover:opacity-100">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2025 BiblioTroca. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
