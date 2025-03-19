import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewCard() {
  return (
    <main className="bg-background">
      <div className="flex h-full flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-medium">Adicionar Novo Item</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Projeto</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para adicionar um novo projeto ao portfólio.
                </CardDescription>
              </CardHeader>
              <form>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" placeholder="Digite o título do projeto" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainImage">Imagem Destaque</Label>
                    <Input id="mainImage" type="file" accept="image/*" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Imagens Adicionais</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Input id="image1" type="file" accept="image/*" />
                      </div>
                      <div>
                        <Input id="image2" type="file" accept="image/*" />
                      </div>
                      <div>
                        <Input id="image3" type="file" accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descreva o projeto em detalhes" rows={4} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Cliente</Label>
                      <Input id="client" placeholder="Nome do cliente" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input id="location" placeholder="Cidade, Estado" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2025"
                      min="1900"
                      max="2100"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Adicionar Projeto
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </main>
  )
}