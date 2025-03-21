import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { getProjetos } from "@/app/app/actions/actions"

export default async function PortfolioGrid() {
  const projetos = await getProjetos()
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-4xl font-bold mb-8">Projetos</h1>

      {projetos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <Card key={projeto.id} className="overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={projeto.imagemDestaque || "/placeholder.svg?height=1000&width=1600"}
                  alt={projeto.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{projeto.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Cliente: </span>{projeto.cliente} 
                  </div>
                  <div>
                    <span className="font-medium">Localização: </span>{projeto.localizacao}
                  </div>
                  <div>
                    <span className="font-medium">Ano: </span>{projeto.ano}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/portfolio/${projeto.id}`}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Ver detalhes
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}