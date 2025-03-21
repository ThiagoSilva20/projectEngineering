import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export function PortfolioHeader() {
  return (
    <section className="py-20 md:pt-32 md:pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Link de voltar com melhor posicionamento e feedback visual */}
          <div className="mb-8">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
              Voltar para Portfólio
            </Link>
          </div>
          
          {/* Conteúdo principal com melhor hierarquia e espaçamento */}
          <div className="text-left md:text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">Nossos Projetos</h1>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl md:mx-auto leading-relaxed">
              Conheça nossa seleção de projetos de engenharia de fachadas executados com excelência técnica e compromisso
              com a qualidade. Nossa experiência abrange diversos segmentos, desde edifícios comerciais e residenciais até
              hospitais e centros empresariais.
            </p>
            
            {/* Botão com melhor feedback visual e destaque */}
            <div className="flex justify-start md:justify-center">
              <Button 
                asChild 
                className="px-6 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Link 
                  href="https://wa.me/5521993392724" 
                  target="_blank" 
                  className="inline-flex items-center"
                >
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}