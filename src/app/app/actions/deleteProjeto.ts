import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const deleteProjeto = async (id: string, imagemPath: string | null) => {
  try {
    if (imagemPath) {
      console.log("Removendo imagem do Storage:", imagemPath)

      const { error: storageError } = await supabase.storage
        .from("projetos-imagens") // ⬅️ Troque pelo nome do seu bucket
        .remove([imagemPath])

      if (storageError) {
        console.error("Erro ao deletar a imagem:", storageError)
        throw new Error("Falha ao deletar a imagem do projeto.")
      }
    }

    console.log("Removendo projeto do banco de dados:", id)

    const { error } = await supabase.from("projetos").delete().match({ id })

    if (error) {
      throw new Error(error.message)
    }

    return true
  } catch (error) {
    console.error("Erro na remoção:", error)
    throw error
  }
}
