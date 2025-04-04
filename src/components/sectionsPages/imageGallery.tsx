"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, MapPin } from 'lucide-react'
import Image from "next/image"

export default function ImageGallery() {
  // Array de objetos com imagem e suas informações específicas
  const imageData = [
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "Casa Residencial - Vista Frontal",
      location: "Rua das Flores, 123 - Jardim Primavera",
      service: "Venda"
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "Sala de Estar Ampla",
      location: "Rua das Flores, 123 - Jardim Primavera",
      service: "Venda"
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "Cozinha Planejada",
      location: "Rua das Flores, 123 - Jardim Primavera",
      service: "Venda"
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "Suíte Master",
      location: "Rua das Flores, 123 - Jardim Primavera",
      service: "Venda"
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      title: "Área de Lazer",
      location: "Rua das Flores, 123 - Jardim Primavera",
      service: "Venda"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? imageData.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === imageData.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  // Obter dados da imagem atual
  const currentImage = imageData[currentIndex]

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Título com linhas decorativas */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-cyan-500 flex-1"></div>
        <h2 className="mx-4 text-xl font-medium text-gray-700 px-4">IMAGENS</h2>
        <div className="h-px bg-cyan-500 flex-1"></div>
      </div>

      {/* Container da imagem principal */}
      <div className="relative mb-4 h-[400px] bg-gray-100">
        {/* Imagem principal */}
        <div className="relative w-full h-full">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Botão de atualizar/girar */}
          <button 
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-md hover:bg-white"
            aria-label="Atualizar imagem"
          >
            <RotateCw className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Botões de navegação */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Informações da imagem atual */}
      <div className="bg-white p-4 mb-4 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">{currentImage.title}</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
          <p className="text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {currentImage.location}
          </p>
          <p className="text-cyan-600 font-medium mt-1 sm:mt-0">
            Serviço: {currentImage.service}
          </p>
        </div>
      </div>

      {/* Barra de miniaturas */}
      <div className="relative">
        <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
          {imageData.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-24 h-20 relative border-2 ${
                index === currentIndex ? "border-cyan-500" : "border-transparent"
              }`}
              title={image.title}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        
        {/* Botões de navegação das miniaturas */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Miniaturas anteriores"
        >
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full hover:bg-white"
          aria-label="Próximas miniaturas"
        >
          <ChevronRight className="h-4 w-4 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
