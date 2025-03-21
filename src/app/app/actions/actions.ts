"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getProjetos() {

  try {
    const projetos = await db.projeto.findMany({
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

    })
    return projetos
}

export async function deleteProjeto(id: string) {
  try {
    // Implemente a lógica para deletar o projeto do seu banco de dados
    // Exemplo:
    await db.projeto.delete({ where: { id } })

    // Revalidar o cache para atualizar as páginas que mostram projetos
    revalidatePath("/portfolio")
    revalidatePath("/app/admin/dashboard/removecard")

    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar projeto:", error)
    throw new Error("Falha ao deletar o projeto")
  }
}