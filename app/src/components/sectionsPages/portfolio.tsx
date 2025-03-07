import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Portfolio() {
  const projects = [
    {
      title: "Edifício Comercial Aurora",
      description: "Fachada em pele de vidro com sistema spider glass",
      image: "/placeholder.svg?height=600&width=800",
      category: "Comercial",
    },
    {
      title: "Residencial Horizonte",
      description: "Fachada ventilada com painéis de alumínio composto",
      image: "/placeholder.svg?height=600&width=800",
      category: "Residencial",
    },
    {
      title: "Centro Empresarial Vértice",
      description: "Fachada cortina com proteção solar integrada",
      image: "/placeholder.svg?height=600&width=800",
      category: "Corporativo",
    },
    {
      title: "Shopping Meridiano",
      description: "Retrofit de fachada com sistema unitizado",
      image: "/placeholder.svg?height=600&width=800",
      category: "Comercial",
    },
    {
      title: "Hospital São Lucas",
      description: "Fachada com painéis fotovoltaicos integrados",
      image: "/placeholder.svg?height=600&width=800",
      category: "Institucional",
    },
    {
      title: "Condomínio Parque das Artes",
      description: "Fachada mista com elementos cerâmicos e vidro",
      image: "/placeholder.svg?height=600&width=800",
      category: "Residencial",
    },
  ]

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Projetos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos nossos principais projetos de engenharia de fachadas realizados para clientes em diversos
            segmentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white/30 bg-transparent hover:bg-white/20"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            Ver Todos os Projetos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

