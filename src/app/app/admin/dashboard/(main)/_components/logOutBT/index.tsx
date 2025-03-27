"use client"
import { logout } from '@/app/app/actions/actions'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout()
      // The redirect will happen in the server action
    } catch (error) {
      console.error('Erro ao sair:', error)
      toast.error('Erro ao sair', {
        description: 'Não foi possível encerrar a sessão. Tente novamente.'
      })
    }
  }

  return (
    <div className="mt-auto">
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={handleLogout} 
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground" 
          >
            <LogOut className="h-5 w-5 text-red-500" />
            <span className="sr-only">Sair</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="pl-3 font-semibold text-muted-foreground uppercase tracking-wide" side="right">
          Sair
        </TooltipContent>
      </Tooltip>
    </div>
  )
}