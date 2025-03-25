import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { ArrowLeft, MessageCircle } from "lucide-react"; // Adicionei MessageCircle para o ícone do WhatsApp
import { getProjetosById } from "@/app/app/actions/actions";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const projetos = await getProjetosById((await params).id);

  if (!projetos) {
    return notFound();
  }

  // URL de exemplo do WhatsApp - substitua o número e a mensagem conforme necessário
  const whatsappUrl = "https://wa.me/5511999999999?text=Olá! Gostaria de falar sobre o projeto " + projetos.titulo;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center text-gray-700 hover:text-indigo-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Voltar para Portfólio</span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Column: Image and Gallery */}
            <div className="lg:w-2/3">
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl mb-10 transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={projetos.imagemDestaque[0] || "/placeholder.svg?height=1000&width=1600"}
                  alt={`Imagem principal do ${projetos.titulo}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <ProjectGallery projeto={projetos} />
            </div>

            {/* Right Column: Details */}
            <div className="lg:w-1/3 flex flex-col">
              <Badge className="mb-4 bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full w-fit">
                {`Projeto #${projetos.id}`}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {projetos.titulo}
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {projetos.descricao}
              </p>

              {/* Project Details - Fixed to 3 Items */}
              <div className="grid grid-cols-3 gap-6 mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                  <h3 className="font-semibold text-base text-gray-800 mb-1">Cliente</h3>
                  <p className="text-gray-600 text-sm">
                    {projetos.cliente || "Não informado"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-gray-800 mb-1">Localização</h3>
                  <p className="text-gray-600 text-sm">
                    {projetos.localizacao || "Não informado"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-gray-800 mb-1">Ano</h3>
                  <p className="text-gray-600 text-sm">
                    {projetos.ano || "Não informado"}
                  </p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Fale Conosco no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}