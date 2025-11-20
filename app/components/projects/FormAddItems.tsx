"use client";
import React, { useEffect, useState } from "react";
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
import { fetchStepsToWorkByIdWork } from "@/app/lib/orders-data";
import { Steps } from "@/lib/types";
import ListItemsDnD from "./ListItemsDnD";
import { Textarea } from "@/components/ui/textarea";
const FormAddItems = ({ id }: { id: string }) => {
  const [Mysteps, setMySteps] = useState<Steps[]>([]);

  useEffect(() => {
    const fetchSteps = async () => {
      const steps = await fetchStepsToWorkByIdWork(id);
      setMySteps(steps);
    };
    fetchSteps();
  }, [id]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof itemRegisterSchema>>({
    resolver: zodResolver(itemRegisterSchema),
    defaultValues: {
      description: "",
      worksId: id,
      order: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof itemRegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = { ...values, order: Mysteps.length };

    const res = await addItemInWork(data);
    if (res.error) {
      toast.error(res.message);
    } else {
      const steps = await fetchStepsToWorkByIdWork(id);
      setMySteps(steps);
      form.reset();
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-xs md:text-sm">
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Introduzca la tarea"
                      {...field}
                      className="md:w-[600px]"
                    /> 
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="self-end w-full md:w-auto text-xs md:text-sm" type="submit">
              Agregar
            </Button>
          </div>
          <FormField
            control={form.control}
            name="worksId"
            render={({ field }) => (
              <FormItem>
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
        </form>
      </Form>
      <ListItemsDnD steps={Mysteps} setSteps={setMySteps} idWork={id} />
    </>
  );
};

export default FormAddItems;
