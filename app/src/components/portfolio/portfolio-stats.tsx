import { Building2, Users, Award, Clock } from "lucide-react"

export function PortfolioStats() {
  const stats = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      value: "50+",
      label: "Projetos Realizados",
      description: "Em todo o Brasil e América Latina",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: "50+",
      label: "Clientes Satisfeitos",
      description: "Empresas e incorporadoras",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      value: "15",
      label: "Prêmios de Excelência",
      description: "Reconhecimento do mercado",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      value: "12+",
      label: "Anos de Experiência",
      description: "Expertise consolidada",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nossa Experiência em Números</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ao longo dos anos, construímos uma sólida reputação no mercado de engenharia de fachadas, com projetos
            executados em diversas regiões do país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg font-medium text-gray-800 mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

