import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getProjetos } from "@/app/app/actions/actions"
import Link from "next/link"

export async function PortfolioFeatured() {
  const projects = await getProjetos()  
  const projectFeatured = projects?.[0] 
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={projectFeatured?.imagemDestaque[0] || "/placeholder.svg?height=1000&width=1600"}
                alt="Edifício Comercial Aurora"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center space-y-6">
            <Badge className="mb-4 w-fit bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300 px-3 py-1">
              Projeto Destaque
            </Badge>
            <h2 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {projectFeatured?.titulo}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg max-w-xl">
              {projectFeatured?.descricao}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Cliente</h3>
                <p className="text-gray-600">{projectFeatured?.cliente}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Localização</h3>
                <p className="text-gray-600">{projectFeatured?.localizacao}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Ano</h3>
                <p className="text-gray-600">{projectFeatured?.ano}</p>
              </div>
            </div>
            <Button 
              className="w-fit bg-blue-600 hover:bg-blue-700 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Link href={`/portfolio/${projectFeatured?.id}`} className="flex items-center text-white font-semibold">
                Ver Detalhes do Projeto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}