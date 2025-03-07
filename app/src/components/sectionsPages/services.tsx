import { Building2, Ruler, ShieldCheck, Wrench, Lightbulb, Compass } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "Projetos de Fachadas",
      description: "Desenvolvimento de projetos completos para fachadas de edifícios comerciais e residenciais.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-primary" />,
      title: "Consultoria Técnica",
      description: "Consultoria especializada para escolha de materiais e soluções técnicas para fachadas.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Inspeção e Laudos",
      description: "Inspeção técnica e emissão de laudos para avaliação de fachadas existentes.",
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: "Retrofit de Fachadas",
      description: "Modernização e atualização de fachadas existentes com novas tecnologias e materiais.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Soluções Sustentáveis",
      description: "Desenvolvimento de projetos com foco em eficiência energética e sustentabilidade.",
    },
    {
      icon: <Compass className="h-10 w-10 text-primary" />,
      title: "Gerenciamento de Obras",
      description: "Acompanhamento e gerenciamento completo da execução de projetos de fachadas.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas em engenharia de fachadas, desde o projeto até a execução, com foco em
            qualidade, inovação e sustentabilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

