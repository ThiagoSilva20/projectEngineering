"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Plus, Eye, Trash2 } from "lucide-react";
import { getGallery, deleteGallery } from "@/app/app/actions/actions";
import { deleteImagemGallery } from "@/services/supabase/actions";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import CardItem from "./_components/card-item";



type Gallery = {
  id: string;
  title: string;
  location?: string;
  images: string[];
  service?: string;
};

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [galleryToDelete, setGalleryToDelete] = useState<Gallery | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const data = await getGallery();
        setGalleries(
          data.map((gallery) => ({
            id: gallery.id,
            title: gallery.title || "",
            images: Array.isArray(gallery.images) ? gallery.images : [],
            service: gallery.service || "",
          }))        );
      } catch (error) {
        toast.error("Erro ao carregar galerias", {
          description: "Não foi possível carregar a lista de galerias.",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGalleries();
  }, []);



   if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando galerias...</p>
      </div>
    );
  }

  if (galleries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Nenhuma galeria encontrada
          </h1>
          <Link href="/app/admin/dashboard/newgallery" className="inline-block">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Criar Primeira Galeria
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Galerias</h1>
          <Link href="/app/admin/dashboard/newcard" className="inline-block">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nova Galeria
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <CardItem key={gallery.id} images={gallery.images} title={gallery.title} id={gallery.id} />
          ))}
        </div>
      </div>

      {/* Modal de Confirmação */}
      
    </TooltipProvider>
  );
}
