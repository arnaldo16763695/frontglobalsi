"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Steps } from "@/lib/types";
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
import { editStepToWorkSchema } from "@/lib/zod";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { editStepToWork } from "@/app/lib/orders-actions";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type FormEditStepToWorkProps = {
  step: Steps;
  onUpdated?: (updatedStep: Steps) => void;
};

export default function FormEditStepToWork({
  step,
  onUpdated,
}: FormEditStepToWorkProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof editStepToWorkSchema>>({
    resolver: zodResolver(editStepToWorkSchema),
    defaultValues: {
      description: step.description,
      stepId: step.id,
      status: step.status      
    },
  });

  const onSuccess = () => {
    setOpen(false);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editStepToWorkSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await editStepToWork(step.worksId, values);
    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
      if (res.error === "workFinished") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro editado exitosamente");
      const updatedStep: Steps = {
        ...step,
        description: values.description,
        status: values.status
      };
      onUpdated?.(updatedStep);

      //this is there when de user admin need to edit step.
      router.refresh();
      onSuccess();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-6 w-6 border-none">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar item</DialogTitle>
          <DialogDescription>Estatus:{step.status}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded px-2 py-1">
                      <option value="PENDING">Pendiente</option>
                      <option value="FINISHED">Finalizada</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción"
                      {...field}
                      className="md:w-[100%]"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Tarea creada por: {step.user.name} {step.user.email}
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Guardar</Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
