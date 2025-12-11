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
import { Plus } from "lucide-react"
import { Steps } from "@/lib/types";

export default function ListItemsDialog({
  idWork,
  onStepsChanged,
}: {
  idWork: string;
  onStepsChanged?: (steps: Steps[]) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm">
          Tarea
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xm">Agregar tareas</DialogTitle>
          <DialogDescription>
            Escriba la descripción de la tarea y presione agregar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* 👇 Le pasamos el callback al form */}
          <FormAddItems id={idWork} onStepsChanged={onStepsChanged} />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
