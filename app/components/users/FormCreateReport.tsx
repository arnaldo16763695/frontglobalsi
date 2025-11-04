"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

// Valida solo los valores permitidos para el Select
const formSchema = z.object({
  reportType: z.enum(["todos", "activos", "inactivos"], {
    required_error: "Seleccione el tipo de reporte.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

function FormCreateReport() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "todos",
    },
  });

//   async function onSubmit(values: FormValues) {
//     const filter = values.reportType; // "todos" | "activos" | "inactivos"
//     window.open(`/api/reports/users/${filter}`, "_blank");
//   }

  async function onSubmit(values: FormValues) {
  const filter = values.reportType; // "todos" | "activos" | "inactivos"

  try {
    // Llamas directamente a tu ruta API en Next.js (que devuelve el PDF)
    const res = await fetch(`/api/reports/users/${filter}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error al generar reporte: ${res.statusText}`);
    }

    // get  PDF as Blob
    const blob = await res.blob();

    // Create a temporal url to blob
    const url = window.URL.createObjectURL(blob);

    // create a hidden link
    const a = document.createElement("a");
    a.href = url;
    a.download = "users-report.pdf"; // file name
    document.body.appendChild(a);
    a.click();

    // clear
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error descargando el reporte:", error);
  }
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="reportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filtro</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los usuarios</SelectItem>
                    <SelectItem value="activos">Activos</SelectItem>
                    <SelectItem value="inactivos">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Seleccione.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Generar</Button>
      </form>
    </Form>
  );
}

export default FormCreateReport;
