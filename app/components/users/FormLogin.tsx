"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
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
import { loginAction } from "@/app/lib/users-actions";
import { Eye, EyeClosed } from "lucide-react";

// import { loginAction } from "@/app/lib/users-actions";

const FormLogin = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // console.log(values)
    try {
      const user = await loginAction(values);
      if (!user.message) {
        toast.success("Bienvenido");
        router.push("/dashboard");
      } else if (user.message) {
        toast.error(user.message);
      }
      // console.log('desde el cliente', user)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="correo@email.com"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isOpen ? "text" : "password"}
                    autoComplete="off"
                    placeholder="introduce tu contaseña"
                    {...field}
                  />
                 {
                    isOpen ? (
                        <Eye className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                        <EyeClosed className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                    )
                 }
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  );
};

export default FormLogin;
