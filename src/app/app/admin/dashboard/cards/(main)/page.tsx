"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { Plus, Eye, Trash2 } from "lucide-react"
import { getProjetos, deleteProjeto } from "@/app/app/actions/actions"
import { deleteImagemProjeto } from "@/services/supabase/actions"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { useState, useEffect } from "react"

type Projeto = {
  id: string
  titulo: string
  descricao?: string
  imagemDestaque?: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projeto[]>([])
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<Projeto | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const dados = await getProjetos()
        setProjects(dados.map(projeto => ({
          id: projeto.id,
          titulo: projeto.titulo,
          descricao: projeto.descricao || '',
          imagemDestaque: Array.isArray(projeto.imagemDestaque) ? projeto.imagemDestaque : []
        })))
      } catch (error) {
        toast.error("Erro ao carregar projetos", {
          description: "Não foi possível carregar a lista de projetos.",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    carregarProjetos()
  }, [])

  const handleDeleteProjeto = (projeto: Projeto) => {
    setProjetoParaExcluir(projeto)
  }

  const confirmDelete = async () => {
    if (projetoParaExcluir) {
      try {
        // Delete project image if exists
        if (projetoParaExcluir.imagemDestaque && projetoParaExcluir.imagemDestaque.length > 0) {
          await deleteImagemProjeto(projetoParaExcluir.imagemDestaque[0])
        }

        // Delete project
        await deleteProjeto(projetoParaExcluir.id)
        
        // Update local state
        setProjects(projects.filter((projeto) => projeto.id !== projetoParaExcluir.id))
        
        toast.success("Projeto removido", {
          description: `${projetoParaExcluir.titulo} foi removido com sucesso.`,
        })
      } catch (error) {
        toast.error("Erro ao remover projeto", {
          description: "Não foi possível remover o projeto. Tente novamente.",
        })
        console.error(error)
      } finally {
        setProjetoParaExcluir(null)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando projetos...</p>
      </div>
    )
  }

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
                {project.imagemDestaque && project.imagemDestaque.length > 0 && (
                  <Image 
                    src={project.imagemDestaque[0]} 
                    alt={project.titulo} 
                    width={500} height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Link href={`/portfolio/${project.id}`}>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Visualizar
                          </Button>
                        </Link>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Visualizar detalhes do projeto
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDeleteProjeto(project)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Remover projeto
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!projetoParaExcluir} onOpenChange={(open) => !open && setProjetoParaExcluir(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-destructive">
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja remover o projeto &quot;{projetoParaExcluir?.titulo}&quot;? 
              Esta ação não pode ser desfeita e todos os dados relacionados serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="
                bg-destructive 
                text-destructive-foreground 
                hover:bg-destructive/90
                transition-colors
                duration-300
              "
              onClick={confirmDelete}
            >
              Remover Projeto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}