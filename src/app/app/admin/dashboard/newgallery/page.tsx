"use client";

/*
eslint-disable @typescript-eslint/no-unused-vars
*/ 
// Removido o eslint-disable para @typescript-eslint/no-explicit-any pois não está sendo usado

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { supabase } from "@/services/supabase/index"; // Adjust this path if needed
import { createGallery } from "@/app/app/actions/actions"; // Adjust this path if needed
import { Plus, X } from "lucide-react"; // Import icons

// UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "./schema";
import { toast } from "sonner";


type CardSchema = z.infer<typeof FormSchema>;

export default function AdicionarGaleria() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CardSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      location: "",
      images: [],
      service: "",
    },
  });

  // Generate preview URLs when imageFiles change
  useEffect(() => {
    // Revoke old preview URLs to avoid memory leaks
    previewUrls.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    // Create new preview URLs
    const newPreviewUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);

    // Cleanup function
    return () => {
      newPreviewUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageFiles, previewUrls]); // Adicionada a dependência previewUrls

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || files.length > 6) {
      if (files && files.length > 6) {
        alert("Você pode enviar no máximo 6 imagens.");
      }
      return;
    }

    const newFiles = Array.from(files).slice(0, 6);
    setImageFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles].slice(0, 6);
      return updatedFiles;
    });

    if (inputRef.current) inputRef.current.value = "";
  };

  // Função para remover uma imagem do estado
  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para criar a galeria (atualizada)
  const handleSubmit = async (values: CardSchema) => {
    try {
      // Verifica se há imagens para fazer upload
      if (imageFiles.length === 0) {
        alert("Por favor, adicione pelo menos uma imagem.");
        return;
      }

      setIsUploading(true);

      const fileUrls: string[] = [];
      for (const file of imageFiles) {
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.name}`;

        try {
          const { data, error } = await supabase.storage
            .from("gallery")
            .upload(fileName, file);

          if (error) {
            console.error("Erro detalhado do Supabase (upload):", error);
            throw error;
          }

          if (data?.path) {
            const { data: urlData } = supabase.storage
              .from("gallery")
              .getPublicUrl(data.path);

            if (urlData.publicUrl) {
              fileUrls.push(urlData.publicUrl);
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
          console.error(`Erro ao fazer upload de ${file.name}:`, error);
          throw new Error(`Falha ao fazer upload de ${file.name}: ${errorMessage}`);
        }
      }

      setImageUrls(fileUrls); // Atualiza as URLs das imagens no estado

      // Ponto chave: passar as URLs das imagens diretamente para o objeto
      const galleryData = {
        ...values,
        images: fileUrls, // Passando as URLs das imagens para o campo images
      };

      console.log("Dados enviados para createGallery:", galleryData);
      
      // Chamar a função de criação da galeria com os dados atualizados
      await createGallery(galleryData);
      
      // Resetar formulário e estados após sucesso
      form.reset();

      setImageFiles([]);
      setPreviewUrls([]);
      setImageUrls([]);
      setIsUploading(false);
      toast.info("Galeria criada com sucesso!");
    } catch (error) {
      setIsUploading(false);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      console.error("Erro detalhado ao criar galeria:", error);
      toast.info(`Erro ao criar galeria: ${errorMessage}`);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <Card className="shadow-lg border-none bg-white rounded-xl max-w-4xl mx-auto">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Nova Galeria
          </CardTitle>
          <CardDescription className="text-gray-600">
            Crie uma nova galeria de imagens para exibir em seu site.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Galeria</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o título" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite a localização" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o serviço" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
              <div>
                <FormLabel>Imagens da Galeria</FormLabel>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    multiple
                    id="gallery-images"
                    ref={inputRef}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="gallery-images"
                    className={`flex items-center justify-center rounded-lg border-2 border-dashed px-6 py-4 cursor-pointer ${
                      isUploading
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-indigo-500"
                    }`}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    {isUploading ? "Carregando..." : "Adicionar imagens"}
                  </label>
                </div>

                {previewUrls.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Imagens adicionadas ({previewUrls.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {previewUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer border-2 rounded-lg overflow-hidden border-transparent"
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={url}
                              fill
                              alt={`Imagem ${index + 1}`}
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-8 w-8 p-0 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 pt-6 border-t">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button
                
                type="submit"
                disabled={imageFiles.length === 0 || isUploading}
              >
                Criar Galeria
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}