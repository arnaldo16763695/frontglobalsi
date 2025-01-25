"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { loginAction } from "@/app/lib/users-actions";
export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: "ACTIVE" | "INAVTIVE" | "DELETED";
};
const FormEditUser = ({ user }: { user: User }) => {
  enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    TECHNICIAN = "TECHNICIAN",
    CLIENT = "CLIENT",
  }
  enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    
  }
  const roles = Object.values(Role);
  const status = Object.values(Status);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userEditSchema>) {
    // return console.log(values)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("role", values.role);
    formData.append("status", values.status);

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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="correo@email.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          defaultValue={user.role}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((rol) => (
                    <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          defaultValue={user.status}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((st) => (
                    <SelectItem key={st} value={st}>{st}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormEditUser;
