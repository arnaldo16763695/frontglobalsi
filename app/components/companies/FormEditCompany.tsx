"use client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { companyEditSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { companyEdit } from "@/app/lib/company-actions";

type Company = {
  id: string;
  companyName: string;
  phone: string;
  email: string;
  rut: string;
  location: string;
  observations: string;
  status: string;
};

const FormEditCompany = ({ company }: { company: Company }) => {
  const router = useRouter();
  enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }

  const status = Object.values(Status);
  // 1. Define your form.
  const form = useForm<z.infer<typeof companyEditSchema>>({
    resolver: zodResolver(companyEditSchema),
    defaultValues: {
      companyName: company.companyName,
      phone: company.phone,
      email: company.email,
      rut: company.rut,
      location: company.location,
      observations: company.observations,
      status: company.status,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof companyEditSchema>) {
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("rut", values.rut);
    formData.append("location", values.location);
    formData.append("observations", values.observations);
    formData.append("status", values.status);

    const res = await companyEdit(company.id, formData);

    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro editado exitosamente");

      router.push("/companies/list");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="companyName"
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
          name="rut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rut:</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXXXXX" {...field} />
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación:</FormLabel>
              <FormControl>
                <Input placeholder="Ubicación" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones:</FormLabel>
              <FormControl>
                <Input placeholder="Observaciones" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
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
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
};

export default FormEditCompany;
