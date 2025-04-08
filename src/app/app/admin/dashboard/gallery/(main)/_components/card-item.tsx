import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import {  Trash2 } from "lucide-react";
import { deleteGallery } from "@/app/app/actions/actions";
import { toast } from "sonner";

interface CardItemProps {
  id: string;
  title: string;
  service?: string;
  images: string[];
}

const CardItem = ({ title, service, images, id }: CardItemProps) => {

  const handleConfirmDelete = async () => {
    try {
      await deleteGallery(id);
      toast.success("Galeria excluída com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error(error + ": Erro ao excluir a galeria.");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl truncate">{title}</CardTitle>
        {service && (
          <CardDescription className="line-clamp-2">{service}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            width={500}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-48 object-cover rounded-md mb-4"
            priority // Remova isso se o CardItem não estiver acima da dobra
          />
        ) : (
          <Image
            src="/fallback.jpg"
            alt="Imagem não disponível"
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleConfirmDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remover galeria</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
