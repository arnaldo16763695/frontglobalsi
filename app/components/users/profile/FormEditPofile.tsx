"use client";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userEditProfileSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileEdit } from "@/app/lib/users-actions";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
// import { loginAction } from "@/app/lib/users-actions";

const FormEditPofile = ({ user, showButton }: { user: User, showButton: boolean }) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof userEditProfileSchema>>({
    resolver: zodResolver(userEditProfileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userEditProfileSchema>) {
    const formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("phone", values.phone.trim());

    const res = await profileEdit(user.id, formData);

    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro editado exitosamente");
      router.push("/dashboard");
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

        

        <Button disabled={!showButton} type="submit">Guardar</Button>
      </form>
      
    </Form>
  );
};

export default FormEditPofile;
