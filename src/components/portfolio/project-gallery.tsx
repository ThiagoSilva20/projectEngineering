"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

// Definindo a interface para o projeto
interface Projeto {
  id: string
  imagensAdicionais?: string[]
}

// Tipando as props do componente
interface ProjectGalleryProps {
  projeto: Projeto
}

export function ProjectGallery({ projeto }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imagens, setImagens] = useState<string[]>([])

  useEffect(() => {
    if (projeto?.imagensAdicionais) {
      setImagens(projeto.imagensAdicionais)
    }
  }, [projeto])

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {imagens.map((imagem, index) => (
          <div
            key={index}
            className="relative h-32 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src="/image/mecanica.webp"
              alt=""
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl p-4 relative">
            <div className="relative h-[80vh] w-full">
              <Image
                src=""
                alt="Imagem em destaque"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}