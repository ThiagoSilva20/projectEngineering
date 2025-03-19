import { db } from "@/lib/db"


export async function getProjetos() {
  try {
    const projetos = await db.projeto.findMany({
      include: {
        usuario: true,
        imagensAdicionais: true,
      },
      orderBy: {
        dataCriacao: "desc",
      },
    })
    return projetos
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return []
  }
}


export async function getProjetosById(id: string) {
    const projetos = await db.projeto.findUnique({
      where: {
        id: id,
      },
      include: {
        usuario: true,
        imagensAdicionais: true,
      },
    })
    return projetos
}