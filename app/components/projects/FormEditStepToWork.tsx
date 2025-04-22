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

export default function FormEditStepToWork({ step }: { step: Steps }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof editStepToWorkSchema>>({
    resolver: zodResolver(editStepToWorkSchema),
    defaultValues: {
      description: step.description,
      stepId: step.id,
    },
  });

  const onSuccess = () => {
    setOpen(false);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editStepToWorkSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await editStepToWork(step.id, values);
    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro editado exitosamente");
      onSuccess();
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-6 w-6 border-none">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar item</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción" {...field} className="md:w-[100%]" />
                  </FormControl>
                  <FormMessage />
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
