"use client"
import { LogOut } from 'lucide-react'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  

  return (
    <div className="mt-auto">
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={() => signOut()} 
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