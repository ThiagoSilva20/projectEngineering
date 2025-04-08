"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCw, MapPin } from "lucide-react";
import Image from "next/image";
import { getGallery } from "@/app/app/actions/actions";

interface GalleryImage {
  id: string;
  url: string; // Altere para o nome correto do campo no seu banco de dados
}

interface GalleryItem {
  id: string;
  title?: string;
  location?: string;
  service?: string;
  images: GalleryImage[]; // Array de objetos imagem
}

export default function ImageGallery() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Placeholder local em base64 para evitar 404s
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjBmMCIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODg4OTk5Ij5JbWFnZW0gSW5kaXNwb25pdsOpbDwvdGV4dD48L3N2Zz4=";

  useEffect(() => {
    const fetchGalleryFromDB = async () => {
      try {
        setLoading(true);
        const data = await getGallery();
        
        // Verifica se os dados são válidos
        if (!data || !Array.isArray(data) || data.length === 0) {
          if (data.length === 0) {
            setGalleryData([]);
            setLoading(false);
            return;
          }
          throw new Error("Formato de dados inválido");
        }

        // Filtra apenas itens da galeria que têm imagens
        const galleryWithImages = data
          .filter(item => item.images && item.images.length > 0)
          .map(item => ({
            ...item,
            images: item.images.map((url: string) => ({ id: crypto.randomUUID(), url })),
          }));
        
        setGalleryData(galleryWithImages);
        setLoading(false);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        setError(errorMessage);
        setLoading(false);
        console.error("Erro ao buscar dados da galeria:", error);
      }
    };

    fetchGalleryFromDB();
  }, []);

  const goToPreviousGallery = () => {
    if (galleryData.length === 0) return;
    const isFirstGallery = currentGalleryIndex === 0;
    const newIndex = isFirstGallery ? galleryData.length - 1 : currentGalleryIndex - 1;
    setCurrentGalleryIndex(newIndex);
    setCurrentImageIndex(0); // Reset the image index when changing galleries
  };

  const goToNextGallery = () => {
    if (galleryData.length === 0) return;
    const isLastGallery = currentGalleryIndex === galleryData.length - 1;
    const newIndex = isLastGallery ? 0 : currentGalleryIndex + 1;
    setCurrentGalleryIndex(newIndex);
    setCurrentImageIndex(0); // Reset the image index when changing galleries
  };

  const goToPreviousImage = () => {
    if (galleryData.length === 0 || !currentGallery?.images?.length) return;
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? currentGallery.images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    if (galleryData.length === 0 || !currentGallery?.images?.length) return;
    const isLastImage = currentImageIndex === currentGallery.images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">Erro: {error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (galleryData.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Nenhuma imagem encontrada na galeria</p>
        </div>
      </div>
    );
  }

  const currentGallery = galleryData[currentGalleryIndex];
  const currentImage = currentGallery.images[currentImageIndex];
  
  // Verifica se temos todas as imagens necessárias
  if (!currentGallery || !currentImage) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Erro ao carregar imagem. Dados incompletos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-cyan-500 flex-1"></div>
        <h2 className="mx-4 text-xl font-medium text-gray-700 px-4">
          IMAGENS ({currentGallery.images.length})
        </h2>
        <div className="h-px bg-cyan-500 flex-1"></div>
      </div>

      <div className="relative mb-4 h-64 md:h-96 bg-gray-100">
        <div className="relative w-full h-full">
          <Image
            src={currentImage.url || placeholderImage}
            alt={currentGallery.title || "Imagem da galeria"}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // @ts-ignore - TypeScript não reconhece a propriedade src em HTMLImageElement
              e.currentTarget.src = placeholderImage;
            }}
          />

          <button
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-md hover:bg-white"
            aria-label="Atualizar imagem"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <button
          onClick={goToPreviousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="bg-white p-4 mb-4 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">
          {currentGallery.title || "Sem título"}
        </h3>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
          <p className="text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {currentGallery.location || "Localização não especificada"}
          </p>
          <p className="text-cyan-600 font-medium mt-1 sm:mt-0">
            Serviço: {currentGallery.service || "Não especificado"}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-center space-x-2 overflow-x-auto py-2 scrollbar-hide">
          {currentGallery.images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 relative border-2 ${
          index === currentImageIndex
            ? "border-cyan-500"
            : "border-transparent"
              }`}
              title={`Imagem ${index + 1}`}
            >
              <Image
          src={image.url || placeholderImage}
          alt={`Miniatura ${index + 1}`}
          fill
          className="object-cover"
          onError={(e) => {
            // @ts-ignore - TypeScript não reconhece a propriedade src em HTMLImageElement
            e.currentTarget.src = placeholderImage;
          }}
              />
            </button>
          ))}
        </div>

        {currentGallery.images.length > 4 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
              aria-label="Miniaturas anteriores"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>

            <button
              onClick={goToNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
              aria-label="Próximas miniaturas"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          </>
        )}
      </div>
      
      {galleryData.length > 1 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={goToPreviousGallery}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md"
          >
            Galeria Anterior
          </button>
          <div className="px-4 py-2 bg-gray-200 text-gray-800">
            {currentGalleryIndex + 1} / {galleryData.length}
          </div>
          <button
            onClick={goToNextGallery}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md"
          >
            Próxima Galeria
          </button>
        </div>
      )}
    </div>
  );
}