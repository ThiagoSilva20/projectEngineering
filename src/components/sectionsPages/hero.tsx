import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/fachada-predio-bonito.jpg"
          alt="Fachada moderna de edifício"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Excelência em Engenharia de Fachadas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Soluções completas e inovadoras para projetos de fachadas com expertise técnica e compromisso com a
            qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">

            <Link href="#contato">
              <Button size="lg" className="text-base">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"

              variant="outline"
              className="text-base bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Link href="#portfolio">Conheça Nossos Projetos</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">+100</p>
              <p className="text-white/80">Projetos Realizados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">12</p>
              <p className="text-white/80">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">+15</p>
              <p className="text-white/80">Profissionais</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-white/80">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

