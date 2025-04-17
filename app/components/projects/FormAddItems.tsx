"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { itemRegisterSchema } from "@/lib/zod";
import { addItemInWork } from "@/app/lib/orders-actions";
import toast from "react-hot-toast";
import { ListItemsDnD } from "./ListItemsDnD";
import { Steps } from "@/lib/types";

const FormAddItems = ({ id, steps }: { id: string; steps: Steps[] }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof itemRegisterSchema>>({
    resolver: zodResolver(itemRegisterSchema),
    defaultValues: {
      description: "",
      worksId: id,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof itemRegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await addItemInWork(values);
    console.log(res);
    if (res.error) {
      toast.error(res.message);
    } else {
      form.reset();
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Introduzca la tarea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="worksId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la empresa"
                    {...field}
                    type="hidden"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Agregar</Button>
        </form>
      </Form>
      <ListItemsDnD steps={steps} />
    </>
  );
};

export default FormAddItems;
