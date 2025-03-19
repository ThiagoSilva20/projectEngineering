/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getProjetos } from "@/app/app/actions/actions"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjetos()
  return (
      <main>
        <div className="flex h-full flex-col">
          <header className="border-b flex justify-center items-center">
            <div className="flex h-16  px-6">
              <h1 className="text-lg font-medium">Projetos</h1>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="container mx-auto">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={project.imagemDestaque || "/placeholder.svg"}
                        alt={project.titulo}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold">{project.titulo}</h3>
                      <div className="flex align-center justify-between">
                      <Button asChild>
                        <Link href={`/app/admin/dashboard/cards/${project.id}`}>visualizar</Link>
                        </Button> 
                      </div>
                    </CardContent>

                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
    </main>
  )
}