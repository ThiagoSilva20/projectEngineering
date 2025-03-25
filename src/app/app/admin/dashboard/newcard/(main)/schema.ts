import { z } from "zod";

export const cardSchema = z.object({
  titulo: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  descricao: z.string().min(2, {
    message: "O descrição deve ter pelo menos 2 caracteres.",
  }),
  imagemDestaque: z.array(z.string().url({
    message: "A URL da imagem deve ser válida."})
  ),
  imagensAdicionais: z.array(z.string().url({
    message: "A URL da imagem deve ser válida."})
  ),
  cliente: z.string().min(2, {
    message: "O nome do cliente deve ter pelo menos 2 caracteres.",
  }),
  localizacao: z.string().min(2, {
    message: "A localização deve ter pelo menos 2 caracteres.",
  }),
  ano: z.string().min(2, {
    message: "o ano deve ter pelo menos 2 caracteres.",
  }),
})