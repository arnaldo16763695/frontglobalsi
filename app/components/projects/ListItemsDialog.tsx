import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormAddItems from "./FormAddItems"


export default function ListItemsDialog({  idWork }: {  idWork:string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >Agregar tareas</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar tareas</DialogTitle>
          <DialogDescription>
            Escriba la descripción de la tarea y presione agregar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormAddItems id={idWork}  />
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
