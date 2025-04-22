"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Steps } from "@/lib/types";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteStepToWork } from "@/app/lib/orders-actions";
import { useState } from "react";
import { DeleteIcon } from "lucide-react";


export default function DiagDeleteStepToWork({ step }: { step: Steps }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  // 2. Define a submit handler.
  async function handleClick() {
    console.log(step);
  
    const res = await deleteStepToWork(step.id);
    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro eliminado exitosamente");
      onSuccess();
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline" className="h-6 w-6 border-none"><DeleteIcon/></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-red-700">Desea eliminar este Item ?</DialogTitle>
        <DialogDescription>
          No podrá recuperar este item una vez eliminado.
        </DialogDescription>
      </DialogHeader>
      <div className="flex  items-end justify-end space-x-2">
     
        <Button type="button" onClick={handleClick} size="sm" className="px-3">
         Eliminar        
        </Button>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
