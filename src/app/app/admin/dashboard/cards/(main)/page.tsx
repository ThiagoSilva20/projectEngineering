/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getProjetos } from "@/app/app/actions/actions"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjetos()
  
  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6">
        <h2 className="text-xl font-medium text-gray-600 mb-4">Nenhum projeto encontrado</h2>
        <Button asChild>
          <Link href="/app/admin/dashboard/newcard">
            <Plus className="mr-2 h-4 w-4" />
            Criar Primeiro Projeto
          </Link>
        </Button>
      </div>
    )
  }
  
  return (
    <main className="h-full flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-xl font-medium">Projetos</h1>
          <Button asChild size="sm">
            <Link href="/app/admin/dashboard/newcard">
              <Plus className="mr-2 h-4 w-4" />
              Novo Projeto
            </Link>
          </Button>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={project.imagemDestaque || "/placeholder.svg"}
                    alt={project.titulo}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-4">{project.titulo}</h3>
                  <div className="mt-auto">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/app/admin/dashboard/cards/${project.id}`}>
                        Visualizar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}