import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"


export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">WMoura Engenharia</h3>
            <p className="text-gray-400 mb-6">
              Soluções completas em engenharia de fachadas, com foco em qualidade, inovação e sustentabilidade.
            </p>
            <div className="flex space-x-4">

              <Link target="_blank" href="https://www.instagram.com/walmirmoura10?igsh=MW83Zzd2aGJhdXd3aw=="><Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              </Link>
              <Link target="_blank" href="https://www.linkedin.com/in/walmir-moura-85547924/"><Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              </Link>

            </div>
          </div>
          <div>

          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} WMoura Engenharia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer >
  )
}

