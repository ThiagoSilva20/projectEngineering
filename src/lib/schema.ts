import { z } from "zod";



export const cardSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  imagemDestaque: z.array(z.any()).min(1, "É necessário pelo menos uma imagem destaque"),
  imagensAdicionais: z.array(z.any()).optional(),
  cliente: z.string().min(1, "O cliente é obrigatório"),
  localizacao: z.string().min(1, "A localização é obrigatória"),
  ano: z.string().min(4, "O ano deve ter 4 dígitos").regex(/^\d{4}$/, "O ano deve ser um número válido"),
});

