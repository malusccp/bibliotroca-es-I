"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  password: string
  location: string
  joinDate: string
  rating: number
  totalTrades: number
  profileImage: string
}

export interface Book {
  id: number
  title: string
  author: string
  genre: string
  status: string
  condition: string
  image: string
  userId: string
  publisher: string
  year: number
  isbn: string
  description: string
  owner: {
    name: string
    rating: number
    reviews: number
    location: string
  }
}

export interface Trade {
  id: number
  requestedBook: string
  requestedFrom: string
  offeredBook: string
  offeredBy: string
  status: string
  stage: number
  date: string
  userId: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string, location: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    password: "senha123",
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    rating: 4.8,
    totalTrades: 12,
    profileImage: "/user-profile.jpg",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    password: "senha123",
    location: "Rio de Janeiro, RJ",
    joinDate: "Fevereiro 2024",
    rating: 4.9,
    totalTrades: 18,
    profileImage: "/user-profile.jpg",
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana@email.com",
    password: "senha123",
    location: "Belo Horizonte, MG",
    joinDate: "Março 2024",
    rating: 4.7,
    totalTrades: 8,
    profileImage: "/user-profile.jpg",
  },
]

const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "O Anticristo",
    author: "Friedrich Nietzsche",
    genre: "Filosofia",
    status: "Disponível",
    condition: "Novo",
    image: "/o-anticristo.jpg",
    userId: "1",
    publisher: "Companhia das Letras",
    year: 1888,
    isbn: "978-8535914252",
    description:
      "Obra filosófica onde Nietzsche critica a moral cristã e apresenta sua filosofia de revalorização de todos os valores. Um dos textos mais provocadores e influentes da filosofia moderna.",
    owner: { name: "João Silva", rating: 4.8, reviews: 24, location: "São Paulo, SP" },
  },
  {
    id: 2,
    title: "O Mal-Estar na Civilização",
    author: "Sigmund Freud",
    genre: "Psicanálise",
    status: "Disponível",
    condition: "Seminovo",
    image: "/o-mal-estar-na-civilizacao.jpg",
    userId: "1",
    publisher: "Companhia das Letras",
    year: 1930,
    isbn: "978-8535914269",
    description:
      "Freud analisa o conflito entre os desejos individuais e as exigências da civilização, explorando as causas do mal-estar psicológico. Uma reflexão profunda sobre a condição humana.",
    owner: { name: "João Silva", rating: 4.8, reviews: 24, location: "São Paulo, SP" },
  },
  {
    id: 3,
    title: "A Morte de Ivan Ilitch",
    author: "Liev Tolstói",
    genre: "Novela",
    status: "Disponível",
    condition: "Seminovo",
    image: "/a-morte-de-ivan-ilitch.jpg",
    userId: "2",
    publisher: "Editora 34",
    year: 1886,
    isbn: "978-8572326735",
    description:
      "Uma novela sobre um homem que, ao enfrentar a morte, questiona o significado de sua vida. Uma meditação profunda sobre mortalidade, propósito e redenção.",
    owner: { name: "Maria Santos", rating: 4.9, reviews: 31, location: "Rio de Janeiro, RJ" },
  },
  {
    id: 4,
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    genre: "Romance",
    status: "Disponível",
    condition: "Usado",
    image: "/memorias-postumas-de-bras-cubas.jpg",
    userId: "2",
    publisher: "Penguin Books",
    year: 1899,
    isbn: "978-8525041678",
    description:
      "Narrado por um defunto, este romance clássico da literatura brasileira mistura humor, ironia e filosofia. Uma obra-prima que revolutionou a narrativa literária brasileira.",
    owner: { name: "Maria Santos", rating: 4.9, reviews: 31, location: "Rio de Janeiro, RJ" },
  },
  {
    id: 5,
    title: "A Hora da Estrela",
    author: "Clarice Lispector",
    genre: "Romance",
    status: "Disponível",
    condition: "Novo",
    image: "/a-hora-da-estrela.jpg",
    userId: "3",
    publisher: "Companhia das Letras",
    year: 1977,
    isbn: "978-8535914009",
    description:
      "Uma novela breve e profunda sobre Macabeia, uma jovem retirante que sonha enquanto vive à margem da sociedade. Uma reflexão poética sobre existência e destino.",
    owner: { name: "Ana Costa", rating: 4.7, reviews: 18, location: "Belo Horizonte, MG" },
  },
  {
    id: 6,
    title: "Vidas Secas",
    author: "Graciliano Ramos",
    genre: "Romance Regionalista",
    status: "Disponível",
    condition: "Seminovo",
    image: "/vidas-secas.jpg",
    userId: "3",
    publisher: "Record",
    year: 1938,
    isbn: "978-8525062340",
    description:
      "Romance que retrata a luta pela sobrevivência de uma família de retirantes no sertão nordestino. Uma obra visceral que captura a essência da condição humana na adversidade.",
    owner: { name: "Ana Costa", rating: 4.7, reviews: 18, location: "Belo Horizonte, MG" },
  },
  {
    id: 7,
    title: "A Metamorfose",
    author: "Franz Kafka",
    genre: "Ficção",
    status: "Disponível",
    condition: "Novo",
    image: "/a-metamorfose.jpg",
    userId: "1",
    publisher: "Companhia das Letras",
    year: 1915,
    isbn: "978-8535918489",
    description:
      "Uma das obras mais icônicas do século XX, onde o protagonista acorda transformado em um inseto. Uma metáfora perturbadora sobre alienação, identidade e absurdo existencial.",
    owner: { name: "João Silva", rating: 4.8, reviews: 24, location: "São Paulo, SP" },
  },
  {
    id: 8,
    title: "Crime e Castigo",
    author: "Fiódor Dostoiévski",
    genre: "Romance Psicológico",
    status: "Disponível",
    condition: "Usado",
    image: "/crime-e-castigo.jpg",
    userId: "2",
    publisher: "Editora 34",
    year: 1866,
    isbn: "978-8572325929",
    description:
      "Um romance psicológico profundo que acompanha Raskolnikov em seu conflito moral após cometer um crime. Uma exploração magistral de culpa, redenção e consciência.",
    owner: { name: "Maria Santos", rating: 4.9, reviews: 31, location: "Rio de Janeiro, RJ" },
  },
  {
    id: 9,
    title: "Violet Bent Backwards Over The Grass",
    author: "Lana Del Rey",
    genre: "Poesia",
    status: "Disponível",
    condition: "Novo",
    image: "/violet-bent-backwards-over-the-grass.jpg",
    userId: "3",
    publisher: "Penguin Classics",
    year: 2020,
    isbn: "978-0143196549",
    description:
      "Coleção de poesias da artista Lana Del Rey, mesclando prosa poética e versos que exploram temas de nostalgia, melancolia e beleza eterna.",
    owner: { name: "Ana Costa", rating: 4.7, reviews: 18, location: "Belo Horizonte, MG" },
  },
  {
    id: 10,
    title: "Ainda Estou Aqui",
    author: "Marcelo Rubens Paiva",
    genre: "Biografia",
    status: "Disponível",
    condition: "Seminovo",
    image: "/ainda-estou-aqui.jpg",
    userId: "1",
    publisher: "Companhia das Letras",
    year: 2015,
    isbn: "978-8535926606",
    description:
      "Memórias emocionantes do autor sobre sua vida, infância com pais presos durante a ditadura militar brasileira e sua jornada pessoal de superação.",
    owner: { name: "João Silva", rating: 4.8, reviews: 24, location: "São Paulo, SP" },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const register = (name: string, email: string, password: string, location: string): boolean => {
    if (MOCK_USERS.find((u) => u.email === email)) {
      return false
    }
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password,
      location,
      joinDate: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      rating: 5,
      totalTrades: 0,
      profileImage: "/user-profile.jpg",
    }
    MOCK_USERS.push(newUser)
    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function getUserBooks(userId: string): Book[] {
  return MOCK_BOOKS.filter((book) => book.userId === userId)
}

export function getAllBooks(): Book[] {
  return MOCK_BOOKS
}
