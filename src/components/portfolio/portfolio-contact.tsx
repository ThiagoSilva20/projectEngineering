"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function PortfolioContact() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar sua Fachada?</h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato conosco para discutir seu projeto. Nossa equipe de especialistas está pronta para
            desenvolver a melhor solução para sua necessidade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="https://wa.me/5521993392724" target="_blank">
              Solicitar Orçamento
            </Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

