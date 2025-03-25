"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";  
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { cardSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/services/supabase";
import { createCard } from "@/app/app/actions/actions";
import { X } from "lucide-react";
import Image from "next/image";

type FormSchema = z.infer<typeof cardSchema>;

export default function AdicionarProjeto() {
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      imagemDestaque: [],
      imagensAdicionais: [],
      cliente: "",
      localizacao: "",
      ano: "",
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadFoto = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length == 1) {
      setImage((prev) => [...prev, ...Array.from(files)].slice(0, 1));
      const fileUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.name}`;
        try {
          const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, file);
          if (error) {
            console.error("Error uploading image:", error);
            return;
          }
          if (data?.path) {
            const { data: urlData } = await supabase.storage
              .from("images")
              .getPublicUrl(data.path);
            if (urlData.publicUrl) {
              fileUrls.push(urlData.publicUrl);
            }
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      setImageUrl((prevUrl) => [...prevUrl, ...fileUrls]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleUploadFotos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length <= 3) { // Alterei para <= 3 para aceitar até 3 arquivos
      // Limitar a 3 imagens no estado
      const newImages = Array.from(files).slice(0, 3);
      setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Garante que o total não exceda 3
  
      const fileUrls: string[] = [];
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.name}`;
        try {
          const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, file);
          if (error) {
            console.error("Error uploading image:", error);
            return;
          }
          if (data?.path) {
            const { data: urlData } = await supabase.storage
              .from("images")
              .getPublicUrl(data.path);
            if (urlData.publicUrl) {
              fileUrls.push(urlData.publicUrl);
            }
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      setImagesUrl((prevUrl) => [...prevUrl, ...fileUrls].slice(0, 3)); // Limita URLs a 3
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removerFoto = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
    setImageUrl((prevUrl) => prevUrl.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagesUrl((prevUrl) => prevUrl.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: FormSchema) => {
    try {
      await createCard({
        ...values,
        imagemDestaque: imageUrl, // Mantém a imagem destaque (1 item)
        imagensAdicionais: imagesUrl.slice(0, 3), // Envia até 3 imagens adicionais
      });
      form.reset();
      setImageUrl([]);
      setImage([]);
      setImagesUrl([]);
      setImages([]);
    } catch (error) {
      console.error("Erro ao criar card:", error);
    }
  };  

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="flex flex-col h-full">
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-2xl font-semibold text-gray-800">Adicionar Projeto</h1>
          </div>
        </header>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-3xl">
            <Card className="shadow-lg border-none bg-white rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">Novo Projeto</CardTitle>
                <CardDescription className="text-gray-600">
                  Preencha os detalhes abaixo para adicionar um projeto ao portfólio.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="titulo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Título</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite o título do projeto"
                              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Descreva o projeto em poucas palavras"
                              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imagemDestaque"
                      render={({}) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Imagem Destaque</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadFoto}
                                disabled={image.length === 1}
                                id="image"
                                ref={inputRef}
                                className="hidden"
                              />
                              <label
                                htmlFor="image"
                                className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-100 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                  image.length >= 1 ? "cursor-not-allowed opacity-50" : ""
                                }`}
                              >
                                {image.length > 0
                                  ? `${image.length} imagem selecionada`
                                  : "Escolher imagem (máx. 1)"}
                              </label>
                            </div>
                          </FormControl>
                          <div className="mt-4 flex gap-4">
                            {image.map((image, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={URL.createObjectURL(image) || "/image.png"}
                                  alt={`Imagem ${index + 1}`}
                                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                                />
                                <Button
                                  onClick={() => removerFoto(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="size-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imagensAdicionais"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Imagens Adicionais</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadFotos}
                                disabled={images.length >= 3}
                                id="images"
                                ref={inputRef}
                                className="hidden"
                              />
                              <label
                                htmlFor="images"
                                className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-4 text-sm font-medium text-gray-600 bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-100 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                  images.length >= 3 ? "cursor-not-allowed opacity-50" : ""
                                }`}
                              >
                                {images.length > 0
                                  ? `${images.length} imagens selecionadas (máx. 3)`
                                  : "Escolher imagens (máx. 3)"}
                              </label>
                            </div>
                          </FormControl>
                          <div className="mt-4 flex flex-wrap gap-4">
                            {images.map((image, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={URL.createObjectURL(image) || "/image.png"}
                                  alt={`Imagem ${index + 1}`}
                                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                                />
                                <Button
                                  onClick={() => removerFoto(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="size-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="cliente"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Cliente</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nome do cliente"
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="localizacao"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Localização</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Cidade ou região"
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="ano"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Ano</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ex: 2023"
                              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      type="button"
                      className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      Adicionar Projeto
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </main>
      </div>
    </main>
  );
}