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
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteTechFromWork } from "@/app/lib/orders-actions";
import { useState } from "react";
import { DeleteIcon } from "lucide-react";


export default function DiagDeleteTechFromWork({ techId, workId }: { techId: string, workId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  // 2. Define a submit handler.
  async function handleClick() {
    console.log(techId, workId  );
  
    const res = await deleteTechFromWork(techId, workId); 
    if (res.error) {
        toast.error(res.message);
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
