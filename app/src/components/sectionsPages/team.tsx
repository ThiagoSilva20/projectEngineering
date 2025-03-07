import Image from "next/image"
import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Team() {
  const teamMembers = [
    {
      name: "Walmir Moura",
      role: "Engenheiro",
      bio: "Mais de 12 anos de experiência em engenharia, atuando como Diretor na W.Moura Engenharia, Proprietário da Workx Prestadora de Serviços e Fiscal de Contrato na Petrobras por 4 anos.",
      image: "/fotoW.jpeg",
      linkedin: "https://www.linkedin.com/in/walmir-moura-85547924/",
    },
  ]

  return (
    <section id="engenheiro" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            <span className="text-primary">Responsável</span>
          </h2>
          
        </div>

        <div className="max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row"
            >
              <div className="relative h-96 md:h-auto md:w-2/5">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-primary font-semibold mb-4 inline-block">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex space-x-3">
                  <Link href="https://www.linkedin.com/in/walmir-moura-85547924/" target="_blank">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    <span>LinkedIn</span>
                  </Button></Link>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}