import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { getProjetos } from "@/app/app/actions/actions";

interface RawProjeto {
  id: string;
  titulo: string;
  descricao: string;
  imagemDestaque?: string[];

}

interface Projeto {
  id: string;
  title: string;
  description: string;
  image: string;

}

export default async function Portfolio() {

  const rawProjects: RawProjeto[] = await getProjetos();
  const allProjects: Projeto[] = rawProjects.map((project) => ({

    id: project.id,
    title: project.titulo,
    description: project.descricao,
    image: project.imagemDestaque?.[0] ?? "/placeholder.svg",

  }));

  const projects = allProjects.slice(0, 6);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Projetos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos nossos principais projetos de engenharia de fachadas realizados para clientes em diversos segmentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center align-center mt-8">
          <Button className="w-40" asChild>
            <Link href={"/portfolio"}>Veja Mais Projetos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
