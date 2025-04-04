import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  location: z.string().min(2, {
    message: "O descrição deve ter pelo menos 2 caracteres.",
  }),

  images: z.array(z.string().url({
    message: "A URL da imagem deve ser válida."})
  ),
  service: z.string().min(2, {
    message: "O nome do cliente deve ter pelo menos 2 caracteres.",
  }),
})