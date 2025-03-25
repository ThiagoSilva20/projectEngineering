import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus, Eye } from "lucide-react"
import { getProjetos } from "@/app/app/actions/actions"
import Link from "next/link"
import Image from "next/image"

export default async function ProjectsPage() {
  const projects = await getProjetos()

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Nenhum projeto encontrado</h1>
          <Link href="/app/admin/dashboard/newcard" className="inline-block">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Criar Primeiro Projeto
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Projetos</h1>
          <Link href="/app/admin/dashboard/newcard" className="inline-block">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Novo Projeto
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl truncate">{project.titulo}</CardTitle>
                {project.descricao && (
                  <CardDescription className="line-clamp-2">
                    {project.descricao}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {project.imagemDestaque && (
                  <Image 
                    src={project.imagemDestaque[0]} 
                    alt={project.titulo} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Link href={`/portfolio/${project.id}`}>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Visualizar Projeto
                        </Button>
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Visualizar detalhes do projeto
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}