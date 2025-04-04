import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { deleteGallery } from "@/app/app/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CardItemProps {
  id: string;
  title: string;
  service?: string;
  images: string[];
}

const CardItem = ({ title, service, images, id }: CardItemProps) => {
  const router = useRouter();

  const handleConfirmDelete = async () => {
    try {
      await deleteGallery(id);
      toast.success("Galeria excluída com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao excluir a galeria.");
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
        {images.length > 0 && (
          <Image
            src={images[0]}
            alt={title}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback.jpg";
            }}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/portfolio/${id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visualizar
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Visualizar detalhes da galeria</TooltipContent>
          </Tooltip>

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
