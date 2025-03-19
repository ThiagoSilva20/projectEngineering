"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function PortfolioFilter() {
  const [activeFilter, setActiveFilter] = useState("todos")

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "comercial", name: "Comercial" },
    { id: "residencial", name: "Residencial" },
    { id: "corporativo", name: "Corporativo" },
    { id: "institucional", name: "Institucional" },
    { id: "retrofit", name: "Retrofit" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar projetos..." className="pl-10 w-full md:w-[300px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

