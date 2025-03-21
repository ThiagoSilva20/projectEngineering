import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectGallery } from "@/components/portfolio/project-gallery"
import { ArrowLeft } from "lucide-react"
import { getProjetosById } from "@/app/app/actions/actions"
import { notFound } from "next/navigation"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {

  const projetos = await getProjetosById((await params).id)

  
  if (!projetos) {  
    return notFound()
  }



  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-10">
        <div className="container px-4">
          <Link href="/portfolio" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Portfólio
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl mb-8">
                <Image
                  src={projetos.imagemDestaque || "/placeholder.svg?height=1000&width=1600"}
                  alt={`Imagem principal do ${projetos.titulo}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <ProjectGallery projeto={projetos} />
            </div>

            <div className="lg:w-1/3">
              <Badge className="mb-4">{`Projeto #${projetos.id}`}</Badge>
              <h1 className="text-3xl font-bold mb-4">{projetos.titulo}</h1>
              <p className="text-gray-600 mb-8">
                {projetos.descricao}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cliente</h3>
                  <p className="text-gray-600">{projetos.cliente || "Não informado"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Localização</h3>
                  <p className="text-gray-600">{projetos.localizacao || "Não informado"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ano</h3>
                  <p className="text-gray-600">{projetos.ano || "Não informado"}</p>
                </div>
              </div>

              <Button className="w-full mb-4">Solicitar Projeto Similar</Button>
              <Button variant="outline" className="w-full">
                Agendar Visita Técnica
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}