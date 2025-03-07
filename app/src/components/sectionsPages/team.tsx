import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Team() {
  const teamMembers = [
    {
      name: "Carlos Oliveira",
      role: "Diretor de Engenharia",
      bio: "Engenheiro Civil com mais de 20 anos de experiência em projetos de fachadas para edifícios de grande porte.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Ana Soares",
      role: "Coordenadora de Projetos",
      bio: "Arquiteta especialista em fachadas ventiladas e sistemas de revestimento de alto desempenho.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Roberto Mendes",
      role: "Engenheiro Estrutural",
      bio: "Especialista em cálculo estrutural para sistemas de fachadas e elementos de fixação.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Juliana Costa",
      role: "Consultora Técnica",
      bio: "Engenheira com especialização em eficiência energética e conforto térmico para fachadas.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contamos com uma equipe multidisciplinar de engenheiros e arquitetos especializados em projetos de fachadas,
            com vasta experiência no mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-80 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn de {member.name}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email de {member.name}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">Conheça Toda a Equipe</Button>
        </div>
      </div>
    </section>
  )
}

