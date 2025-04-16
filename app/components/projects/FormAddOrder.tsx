"use client";
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Company } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectRegisterSchema } from "@/lib/zod";
import { orderRegister } from "@/app/lib/orders-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormAddOrder = ({ companies }: { companies: Company[] }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof projectRegisterSchema>>({
    resolver: zodResolver(projectRegisterSchema),
    defaultValues: {
      companyId: "",
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof projectRegisterSchema>) {
    const res = await orderRegister(values);
    console.log('respuesta: ->',res);
    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro creado exitosamente");

      router.push("/projects/list");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.length > 0 &&
                      companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.companyName + " " + company.rut}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
};

export default FormAddOrder;
