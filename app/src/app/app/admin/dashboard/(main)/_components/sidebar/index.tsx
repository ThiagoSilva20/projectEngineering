import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Home, LogOut, Package, PanelBottom, ShoppingBag } from "lucide-react";
import { LuPackagePlus } from "react-icons/lu";
import { IoIosPersonAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { FaRegTrashAlt } from "react-icons/fa";

export function Sidebar() {
  return (
    <div className="flex flex-col w-ful bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="fixed flex-col inset-y-0 left-0 z-10 w-14 hidden border-r bg-background
      sm:flex">
        <nav className="flex flex-col  items-center px-2 py-5 gap-4">
          <TooltipProvider>
            <Link href="#" className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full mb-4">
              <Package className="h-4 w-4" />
              <span className="sr-only">Dashboard Avatar</span>
            </Link>

            <Tooltip>   
              <TooltipTrigger asChild>
                <Link href="/app/admin/dashboard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                  text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Inicio</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="pl-3 font-semibold text-muted-foreground uppercase tracking-wide" side="right">Inicio</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/app/admin/dashboard/cards"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                  text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  <ShoppingBag className="h-5 w-5" />
                  <span className="sr-only">Projetos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="pl-3 font-semibold text-muted-foreground uppercase tracking-wide" side="right">Projetos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/app/admin/dashboard/newcard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                  text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  <LuPackagePlus className="h-5 w-5" />
                  <span className="sr-only">Adicionar Projetos </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="pl-3 font-semibold text-muted-foreground uppercase tracking-wide" side="right">Adicionar Projetos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/app/admin/dashboard/removecard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                  text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  <FaRegTrashAlt  className="h-5 w-5" />
                  <span className="sr-only">Remover Projetos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="pl-3 font-semibold text-muted-foreground uppercase tracking-wide" side="right">Remover Projetos</TooltipContent>
            </Tooltip>   

          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  <LogOut className="h-5 w-5 text-red-600" />
                  <span className="sr-only">Sair</span> {/* ✅ Agora está dentro do <Link> */}
                </Link>
              </TooltipTrigger>
              <TooltipContent className="pl-3  font-semibold text-muted-foreground uppercase tracking-wide" side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Mobile */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 sm:hidden">
        <header className="sticky top-0 z-30 flex h-14 
        items-center sm:hidden sm:h-auto sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild >
              <Button size="icon" variant="ghost" className="hover:bg-accent">
                <PanelBottom className="h-5 w-5" />
                <span className="sr-only">Abrir | Fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-xs sm:hidden border-r">
              <nav className="grid gap-4 text-lg font-medium sm:hidden py-2">
                <Link href="#" className="flex h-10 w-10 bg-primary 
      rounded-full text-lg items-center justify-center 
      text-primary-foreground md:text-base shadow-sm"
                  prefetch={false}
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Logo do Projeto</span>
                </Link>
                <Link href="#" className="flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  prefetch={false} >
                  <Home className="h-5 w-5" />
                  Inicio
                </Link>
                <Link href="#" className="flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  prefetch={false} >
                  <ShoppingBag className="h-5 w-5" />
                  Pedidos
                </Link>
                <Link href="#" className="flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  prefetch={false} >
                  <LuPackagePlus className="h-5 w-5" />
                  Adicionar projeto
                </Link>
                <Link href="#" className="flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  prefetch={false} >
                  <IoIosPersonAdd className="h-5 w-5" />
                  Clientes
                </Link>
                <Link href="#" className="flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  prefetch={false} >
                  <IoSettingsOutline className="h-5 w-5" />
                  Configurações
                </Link>
              </nav>
            </SheetContent>
            <h2 className="font-semibold text-muted-foreground uppercase tracking-wide">Menu</h2>
          </Sheet>
        </header>
      </div>
    </div>
  );
}