"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cardSchema } from "../admin/dashboard/newcard/(main)/schema"
import { prisma } from "@/services/database"

export async function getProjetos() {

  try {
    const projetos = await db.projeto.findMany({
      orderBy: {
        dataCriacao: "desc",
      },
      select:{
        id: true,
        titulo: true,
        descricao: true,
        imagemDestaque: true,
        imagensAdicionais: true,
        cliente: true,
        localizacao: true,
        ano: true,
      }
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

interface CardsProps {
  id?: string | undefined
  titulo: string
  descricao: string
  imagemDestaque: string[]
  imagensAdicionais: string[]
  cliente: string
  localizacao: string
  ano: string
}

export const createCard = async (data: CardsProps) => {
  cardSchema.parse(data)

  try {
    await prisma.projeto.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        imagemDestaque: data.imagemDestaque,
        imagensAdicionais: data.imagensAdicionais,
        cliente: data.cliente,
        localizacao: data.localizacao,
        ano: data.ano,
      },
    })
  } catch (error) {
    console.error("Erro ao criar card:", error)
      throw new Error("Falha ao criar o card")
  } 

}