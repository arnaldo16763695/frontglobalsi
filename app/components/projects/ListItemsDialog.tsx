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


export default function ListItemsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar tareas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar tareas</DialogTitle>
          <DialogDescription>
            Escriba la descripción de la tarea y presione enter.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormAddItems />
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
