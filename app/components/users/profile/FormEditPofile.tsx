"use client";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userEditSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userEdit } from "@/app/lib/users-actions";
import { useRouter } from "next/navigation";


// import { loginAction } from "@/app/lib/users-actions";
export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: string;
};
const FormEditPofile = ({ user }: { user: User }) => {

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userEditSchema>) {
    // return console.log(values)
    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("phone", values.phone.trim());

    const res = await userEdit(user.id, formData);

    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
      console.log(res.message)
    } else {
      toast.success("Registro editado exitosamente");    
      router.push("/users/list");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono:</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXXXXX" {...field} />
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

export default FormEditPofile;
