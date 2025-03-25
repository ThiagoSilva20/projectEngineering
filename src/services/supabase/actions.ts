import { supabase } from "@/services/supabase";

export async function uploadImage(file: File, userId: string) {
    const fileName = `${userId}-${Date.now()}.${file.name}`;
    const{ data, error } = await supabase.storage.from('images').upload(fileName, file, {cacheControl:'3600', upsert: false})
    if (error){
        console.error('Error uploading image:', error);
        return null;
    }
    return data.path;
}
export async function deleteImagemProjeto(imagePath: string) {
  
    // Remove the Supabase storage URL prefix if it exists
    const cleanPath = imagePath.replace(/^.*\/storage\/v1\/object\/public\//, '')
  
    const { error } = await supabase.storage.from('images').remove([cleanPath])
  
    if (error) {
      console.error('Erro ao excluir imagem:', error)
      throw error
    }
  }
