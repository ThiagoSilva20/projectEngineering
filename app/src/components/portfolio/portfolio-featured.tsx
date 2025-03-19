import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getProjetos } from "@/app/app/actions/actions"
import Link from "next/link"

export async function PortfolioFeatured() {
  const projects = await getProjetos()
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src={projects[0].imagemDestaque || "/placeholder.svg"}  
                alt="Edifício Comercial Aurora"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <Badge className="mb-4 w-fit">Projeto Destaque</Badge>
            <h2 className="text-3xl font-bold mb-4">{projects[0].titulo}</h2>
            <p className="text-gray-600 mb-6">
              {projects[0].descricao}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">Cliente</h3>
                <p className="text-gray-600">{projects[0].cliente}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Localização</h3>
                <p className="text-gray-600">{projects[0].localizacao}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Ano</h3>
                <p className="text-gray-600">2022</p>
              </div>
            </div>
            <Button className="w-fit" >
              <Link href={`/portfolio/${projects[0].id}`}>
              Ver Detalhes do Projeto
              </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

