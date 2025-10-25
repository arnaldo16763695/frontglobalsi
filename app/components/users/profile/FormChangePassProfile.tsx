"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userChangePassSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userProfileChangePass } from "@/app/lib/users-actions";
import { useState } from "react";
import { User } from '@/lib/types'
// import { loginAction } from "@/app/lib/users-actions";

const FormChangePassProfile = ({ user }: { user: User }) => {
  const [message, setMessage] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof userChangePassSchema>>({
    resolver: zodResolver(userChangePassSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userChangePassSchema>) {
    // return console.log(values)
    const formData = new FormData();
    formData.append("password", values.password.trim());
    formData.append("password2", values.password2.trim());
    const pass1 = formData.get("password");
    const pass2 = formData.get("password2");

    if (pass1 !== pass2) {
      setMessage(true);
      form.reset({
        password: "",
        password2: "",
      });
     setTimeout(() => {
      setMessage(false)
     }, 2000);
    } else {
      const res = await userProfileChangePass(user.id, formData);

      if (res.error) {
        if (res.error === "Conflict") {
          toast.error(res.message);
        }
        console.log(res.message);
      } else {
        toast.success("Contraseña editada exitosamente");
        router.push("/dashboard");
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {message && (
          <div className="text-red-800">Las contraseñas no coinciden</div>
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña:</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repite contraseña:</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
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

export default FormChangePassProfile;
