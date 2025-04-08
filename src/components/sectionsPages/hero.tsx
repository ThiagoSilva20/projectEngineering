"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const list = [
    {
      title: "Fachadas",
      service: "Soluções completas e inovadoras para fachadas.",
      image: "/image/a.jpg",
    },
    {
      title: "Estruturas",
      service: "Estruturas de alta resistência e durabilidade.",
      image: "/image/b.jpg",
    },
    {
      title: "Acabamentos",
      service: "Acabamentos de alta qualidade e estética.",
      image: "/image/c.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
    }, 10000); // 10 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [list.length]);

  const currentItem = list[currentIndex];

  return (
    <section
      id="inicio"
      className="relative pt-24 vh-100 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentItem.image}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {currentItem.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {currentItem.service}
          </p>
        </div>
      </div>
    </section>
  );
}
