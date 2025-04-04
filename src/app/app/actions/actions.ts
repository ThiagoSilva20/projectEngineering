"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cardSchema } from "../admin/dashboard/newcard/(main)/schema";
import { prisma } from "@/services/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Corrigindo o uso de FormSchema como esquema de validação
const formSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  location: z.string(),
  service: z.string(),
  images: z.array(z.string()),
});

export async function getProjetos() {
  try {
    const projetos = await db.projeto.findMany({
      orderBy: {
        dataCriacao: "desc",
      },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        imagemDestaque: true,
        imagensAdicionais: true,
        cliente: true,
        localizacao: true,
        ano: true,
      },
    });
    return projetos;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function getProjetosById(id: string) {
  try {
    const projeto = await db.projeto.findUnique({
      where: { id },
    });
    return projeto;
  } catch (error) {
    console.error("Erro ao buscar projeto por ID:", error);
    throw new Error("Falha ao buscar o projeto");
  }
}

export async function deleteProjeto(id: string) {
  try {
    await db.projeto.delete({ where: { id } });

    revalidatePath("/portfolio");
    revalidatePath("/app/admin/dashboard/removecard");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw new Error("Falha ao deletar o projeto");
  }
}

interface CardsProps {
  id?: string;
  titulo: string;
  descricao: string;
  imagemDestaque: string[];
  imagensAdicionais: string[];
  cliente: string;
  localizacao: string;
  ano: string;
}

export const createCard = async (data: CardsProps) => {
  cardSchema.parse(data);

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
    });
  } catch (error) {
    console.error("Erro ao criar card:", error);
    throw new Error("Falha ao criar o card");
  }
};

export async function logout() {
  try {
    const cookieStore = cookies();
    (await cookieStore).delete("authenticationjs.session-token");
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    throw new Error("Falha ao realizar logout");
  }
  redirect("/login");
}

export const createGallery = async (data: z.infer<typeof formSchema>) => {
  formSchema.parse(data);

  try {
    await prisma.gallery.create({
      data: {
        title: data.title,
        location: data.location,
        images: data.images,
        service: data.service,
      },
    });
  } catch (error) {
    console.error("Erro ao criar galeria:", error);
    throw new Error("Falha ao criar a galeria");
  }
};

export async function getGallery() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        location: true,
        images: true,
        service: true,
      },
    });
    return gallery;
  } catch (error) {
    console.error("Erro ao buscar galeria:", error);
    return [];
  }
}

export async function getGalleryById(id: string) {
  try {
    const gallery = await db.gallery.findUnique({
      where: { id },
    });
    return gallery;
  } catch (error) {
    console.error("Erro ao buscar galeria por ID:", error);
    throw new Error("Falha ao buscar a galeria");
  }
}

export const deleteGallery = async (id: string) => {
  const gallery = await db.gallery.delete({
    where: { id },
  });
  revalidatePath("/app/admin/dashboard/gallery");
  return gallery;

};