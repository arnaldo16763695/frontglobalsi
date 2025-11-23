"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { updateCompanyInWorkSchema } from "@/lib/zod";
import { Company } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editCompanyInWork } from "@/app/lib/orders-actions";

export function DiagEditCopanyInWork({
  companyId,
  companies,
  idProject,
}: {
  companyId: string;
  companies: Company[];
  idProject: string;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false); // controlamos el diálogo
  const router = useRouter();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateCompanyInWorkSchema>>({
    resolver: zodResolver(updateCompanyInWorkSchema),
    defaultValues: {
      companyId: companyId,
    },
  });
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof updateCompanyInWorkSchema>) {
    
    const res = await editCompanyInWork(idProject, values)

    if (res.error) {
      toast.error(res.message); 
    } else {
      setDialogOpen(false);
      toast.success("Registro editado exitosamente");
      router.push(`/projects/${idProject}/edit`);
    }
  } 
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none h-6 w-6">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ediitar company</DialogTitle>
          <DialogDescription>
            Puede editar la empresa a la cual pertenece esta orden
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-xs md:text-sm"
          >
            <div className="p-2">
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
                        <SelectTrigger className="w-[240px] md:w-[300px]">
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
            </div>
            <Button type="submit">Guardar</Button>
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            className="bg-red-500"
            onClick={() => setDialogOpen(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
