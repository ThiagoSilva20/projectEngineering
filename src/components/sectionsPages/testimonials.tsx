import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "A equipe da WMoura Engenharia foi fundamental para o sucesso do nosso projeto. Profissionais altamente qualificados e comprometidos com a excelência.",
      author: "Ricardo Almeida",
      company: "Construtora Horizonte",
      role: "Diretor de Obras",
    },
    {
      quote:
        "Excelente trabalho técnico e atendimento impecável. Os projetos de fachada desenvolvidos para o WMoura Engenharia superaram nossas expectativas em termos de qualidade e inovação.",
      author: "Mariana Santos",
      company: "MS Arquitetura",
      role: "Arquiteta Titular",
    },
    {
      quote:
      "Contratamos a WMoura Engenharia para o retrofit da fachada do nosso edifício corporativo e o resultado foi excepcional. Recomendo fortemente os serviços da WMoura Engenharia.",
      author: "Paulo Mendonça",
      company: "Grupo Empresarial Vértice",
      role: "Gerente de Facilities",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A satisfação de nossos clientes é o nosso maior reconhecimento. Confira alguns depoimentos sobre nossos
            serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-primary font-medium">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

