"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Trash2, EyeOff, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import { getProjetos, deleteProjeto } from "@/app/app/actions/actions"
import { deleteImagemProjeto } from "@/services/supabase/actions"

type Projeto = {
  id: string
  titulo: string
  cliente: string
  localizacao: string
  ano: string
  imagemDestaque: string | null
  imagemAdicionais: string[] | null
}

export default function RemoverProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<Projeto | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const dados = await getProjetos()
        setProjetos(dados.map(projeto => ({
          id: projeto.id,
          titulo: projeto.titulo,
          cliente: projeto.cliente || '',
          localizacao: projeto.localizacao || '',
          ano: projeto.ano || '',
          imagemDestaque: Array.isArray(projeto.imagemDestaque) ? projeto.imagemDestaque[0] || null : null,
          imagemAdicionais: Array.isArray(projeto.imagensAdicionais) ? projeto.imagensAdicionais.slice(0,4) || null : null
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
        if (projetoParaExcluir.imagemDestaque) {
          await deleteImagemProjeto(projetoParaExcluir.imagemDestaque)
        }

        await deleteProjeto(projetoParaExcluir.id)
        
        setProjetos(projetos.filter((projeto) => projeto.id !== projetoParaExcluir.id))
        
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

  const LoadingSkeleton = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div 
          key={index} 
          className="bg-gray-100 rounded-xl overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Gerenciar Projetos</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" className="text-muted-foreground">
                    <Info className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aqui você pode visualizar e remover seus projetos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground mt-2">
            Gerencie seus projetos com facilidade. Clique no botão de lixeira para remover um projeto.
          </p>
        </header>

        <main>
          {isLoading ? (
            <LoadingSkeleton />
          ) : projetos.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <EyeOff className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                Nenhum projeto encontrado
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Adicione um novo projeto para começar
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto) => (
                <Card 
                  key={projeto.id} 
                  className="
                    group overflow-hidden 
                    transition-all duration-300 
                    hover:shadow-xl
                    border-transparent 
                    bg-white 
                    shadow-md
                    flex flex-col
                  "
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={projeto.imagemDestaque || "/placeholder.svg?height=1000&width=1600"}
                      alt={projeto.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-4 pt-2 flex-grow">
                    <div className="space-y-2">
                      <h3 className="
                        text-lg font-semibold 
                        line-clamp-1 
                        text-primary
                        transition-colors
                      ">
                        {projeto.titulo}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Cliente:</span>
                          <span className="truncate">{projeto.cliente}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Ano:</span>
                          <span>{projeto.ano}</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <span className="font-medium">Localização:</span>
                          <span className="truncate">{projeto.localizacao}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-4 pt-0">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteProjeto(projeto)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remover Projeto
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
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
    </main>
  )
}