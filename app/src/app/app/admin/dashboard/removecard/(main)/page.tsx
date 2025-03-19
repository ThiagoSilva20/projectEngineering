"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
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

// Sample data for demonstration
const initialItems = [
  {
    id: "1",
    name: "Smartphone XYZ",
    price: 1299.99,
    category: "Eletrônicos",
    image: "/placeholder.svg?height=100&width=100",
    stock: 15,
  },
  {
    id: "2",
    name: "Notebook Ultra",
    price: 3499.99,
    category: "Eletrônicos",
    image: "/placeholder.svg?height=100&width=100",
    stock: 8,
  },
  {
    id: "3",
    name: "Camiseta Premium",
    price: 79.99,
    category: "Vestuário",
    image: "/placeholder.svg?height=100&width=100",
    stock: 42,
  },
  {
    id: "4",
    name: "Tênis Esportivo",
    price: 249.99,
    category: "Vestuário",
    image: "/placeholder.svg?height=100&width=100",
    stock: 23,
  },
  {
    id: "5",
    name: "Livro: Programação Moderna",
    price: 89.99,
    category: "Livros",
    image: "/placeholder.svg?height=100&width=100",
    stock: 31,
  },
  {
    id: "6",
    name: "Fone de Ouvido Bluetooth",
    price: 199.99,
    category: "Eletrônicos",
    image: "/placeholder.svg?height=100&width=100",
    stock: 19,
  },
]

type Item = (typeof initialItems)[0]

export default function RemoveCard() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const handleDeleteItem = (item: Item) => {
    setItemToDelete(item)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(items.filter((item) => item.id !== itemToDelete.id))
      toast.success("Item removido", {
        description: `${itemToDelete.name} foi removido com sucesso.`,
      })
      setItemToDelete(null)
    }
  }

  return (
    <main>
        <div>

        <div className="flex h-full flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-6">
              <h1 className="text-lg font-medium">Remover Produtos</h1>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="container mx-auto">

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="line-clamp-1 text-lg">{item.name}</CardTitle>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteItem(item)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remover</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover? Esta ação não pode ser desfeita.
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


                    </Card>
                  ))}
                </div>

            </div>
          </main>
        </div>
        </div>
      {/* This is a fallback dialog in case the inline dialog doesn't work properly */}
      {itemToDelete && (
        <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover ? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancelar</AlertDialogCancel>
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

