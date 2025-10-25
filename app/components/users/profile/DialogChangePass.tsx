import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormChangePassProfile from "./FormChangePassProfile"
import { User } from "@/lib/types"
import { Key } from "lucide-react"

export function DialogChangePass({user}: {user: User}) {
  return (
    <Dialog>
    
        <DialogTrigger className="dark:bg-muted/50 bg-muted text-xs md:text-sm flex items-center gap-2 border border-muted rounded-md p-2 ">
          <Key className="w-4 h-4" />
          Cambiar contraseña
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar contraseña</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
         <FormChangePassProfile user={user}/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
     
    </Dialog>
  )
}
