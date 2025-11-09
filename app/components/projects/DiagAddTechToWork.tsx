"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { addTechToWork } from "@/app/lib/orders-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { technicianToWorkSchema } from "@/lib/zod";
import { User } from "@/lib/types";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DiagAddTechToWork({ idWork, technicians }: { idWork: string, technicians: User[] }) {
  const [dialogOpen, setDialogOpen] = useState(false); // controlamos el diálogo
  
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof technicianToWorkSchema>>({
    resolver: zodResolver(technicianToWorkSchema),
    defaultValues: {
      idTech: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof technicianToWorkSchema>) {
    const res = await addTechToWork(values, idWork);
    
    if (res.error) {
        if (res.error === "Conflict") {
          toast.error(res.message);
        }
      } else {
        toast.success("Registro creado exitosamente");
        setDialogOpen(false);
        router.refresh();
      }
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button >Asignar Técnico</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Asignar Técnico</DialogTitle>
          <DialogDescription>
            Seleccione un técnico
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={form.control}
          name="idTech"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Técnico</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un técnico" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Guardar</Button>
          </form>
        </Form>
        <DialogFooter>
      
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
