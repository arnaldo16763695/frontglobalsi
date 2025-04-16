"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Projects } from "@/lib/types";
import { Button } from "@/components/ui/button";
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
import { Company, Clients } from "@/lib/types";
import { projectEditSchema } from "@/lib/zod";
const FormEditProject = ({
  project,
  companies,
  client,
}: {
  project: Projects;
  companies: Company[];
  client: Clients;
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof projectEditSchema>>({
    resolver: zodResolver(projectEditSchema),
    defaultValues: {
      companyId: project.companyId,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof projectEditSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 border">
              <div className="p-1 md:p-2 flex gap-1 items-center">
                <div>
                  <span className="font-bold">Orden: </span>
                </div>
                <div>
                  <span className="text-xl text-green-600">
                    {project.workCode}
                  </span>
                </div>
              </div>
              <div className="p-1 md:p-2 flex gap-1 items-center">
                <div>
                  <span className="font-bold">Cliente: </span>
                </div>
                <div>
                  <span className="text-xl text-green-600">{client.name}</span>
                </div>
              </div>
              <div className="p-1 md:p-2 flex gap-1 items-center">
                <div>
                  <span className="font-bold">Estado de la orden: </span>
                </div>
                <div>
                  {
                    <span
                      className={`text-xl ${(() => {
                        switch (project.progress) {
                          case "NOT_STARTED":
                            return "text-red-600";
                          case "IN_PROGRESS":
                            return "text-yellow-600";
                          case "FINISHED":
                            return "text-green-600";
                          default:
                            return "text-gray-500";
                        }
                      })()}`}
                    >
                      {(() => {
                        switch (project.progress) {
                          case "NOT_STARTED":
                            return "No iniciada";
                          case "IN_PROGRESS":
                            return "Iniciada";
                          case "FINISHED":
                            return "Finalizada";
                          default:
                            return project.progress;
                        }
                      })()}
                    </span>
                  }
                </div>
              </div>
            </div>

            <div className="flex gap-2 border">
              <div className="border w-[40%] p-2">
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
              </div>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default FormEditProject;
