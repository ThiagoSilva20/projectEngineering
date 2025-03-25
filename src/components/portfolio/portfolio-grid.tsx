import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { getProjetos } from "@/app/app/actions/actions"

export default async function PortfolioGrid() {
  const projetos = await getProjetos()
  return (
    <div className="container py-16 mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        Nossos Projetos
      </h1>

      {projetos.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">Nenhum projeto encontrado no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((projeto) => (
            <Card 
              key={projeto.id} 
              className="overflow-hidden flex flex-col bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none group"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={projeto.imagemDestaque[0] || "/placeholder.svg?height=1000&width=1600"}
                  alt={projeto.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {projeto.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow px-6 py-4">
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="space-y-1">
                    <span className="font-medium text-gray-800">Cliente:</span>
                    <p>{projeto.cliente}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-medium text-gray-800">Localização:</span>
                    <p>{projeto.localizacao}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-medium text-gray-800">Ano:</span>
                    <p>{projeto.ano}</p>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6 mt-auto">
                <Link
                  href={`/portfolio/${projeto.id}`}
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition-all duration-300 group-hover:shadow-lg transform hover:-translate-y-1"
                >
                  Ver Detalhes
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}