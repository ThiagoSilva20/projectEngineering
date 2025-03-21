"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { getProjetos, deleteProjeto } from "@/app/app/actions/actions"

// Definindo o tipo para os projetos
type Projeto = {
  id: string
  titulo: string
  cliente: string
  localizacao: string
  ano: string
  imagemDestaque: string | null
}

export default function RemoverProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<Projeto | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar projetos ao montar o componente
  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const dados = await getProjetos()
        setProjetos(dados)
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

  return (
    <main>
      <div className="flex h-full flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-medium">Remover Projetos</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : projetos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projetos.map((projeto) => (
                  <Card key={projeto.id} className="overflow-hidden">
                    <div className="relative w-full h-48">
                      <Image
                        src={projeto.imagemDestaque || "/placeholder.svg?height=1000&width=1600"}
                        alt={projeto.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="line-clamp-1 text-lg">{projeto.titulo}</CardTitle>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteProjeto(projeto)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja remover o projeto "{projeto.titulo}"? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={confirmDelete}
                              >
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Cliente: </span>
                          {projeto.cliente}
                        </div>
                        <div>
                          <span className="font-medium">Localização: </span>
                          {projeto.localizacao}
                        </div>
                        <div>
                          <span className="font-medium">Ano: </span>
                          {projeto.ano}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Dialog de fallback */}
      {projetoParaExcluir && (
        <AlertDialog open={!!projetoParaExcluir} onOpenChange={(open) => !open && setProjetoParaExcluir(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover o projeto "{projetoParaExcluir.titulo}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProjetoParaExcluir(null)}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={confirmDelete}
              >
                Remover
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </main>
  )
}

