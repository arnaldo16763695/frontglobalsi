"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronsUpDown, Pencil, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateWorkStatusSchema } from "@/lib/zod";
import { updateWorkStatus } from "@/app/lib/orders-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const statuses = [
  { value: "NOT_STARTED", label: "No iniciada" },
  { value: "IN_PROGRESS", label: "Iniciada" },
  { value: "FINISHED", label: "Finalizada" },
];

export default function DiagEditStatusWork({
  projectId,
  initialStatus,
}: {
  projectId: string;
  initialStatus: string;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false); // controlamos el diálogo
  const [comboOpen, setComboOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateWorkStatusSchema>>({
    resolver: zodResolver(updateWorkStatusSchema),
    defaultValues: {
      status: initialStatus,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof updateWorkStatusSchema>) {
    const res = await updateWorkStatus(projectId, { status: values.status });
    console.log(res);
    if (res.error) {
      if (res.error === "Conflict") {
        toast.error(res.message);
      }
      if (res.error === "whitoutTech") {
        toast.error(res.message);
      }
      if (res.error === "stepsPending") {
        toast.error(res.message);
      }
      if (res.error === "whitoutSteps") {
        toast.error(res.message);
      }
    } else {
      toast.success("Registro editado exitosamente");
      setDialogOpen(false);
      router.push(`/projects/${projectId}/edit`);
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
          <DialogTitle>Editar status</DialogTitle>
          <DialogDescription>
            Seleccione el nuevo status y haga clic en **Guardar cambios**.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm mr-2">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Popover modal open={comboOpen} onOpenChange={setComboOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={comboOpen}
                          className="w-[200px] justify-between"
                        >
                          {field.value
                            ? statuses.find((s) => s.value === field.value)
                                ?.label
                            : "Seleccione…"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-[200px] p-0"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Buscar status..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron resultados.
                            </CommandEmpty>
                            <CommandGroup>
                              {statuses.map((s) => (
                                <CommandItem
                                  key={s.value}
                                  value={s.value}
                                  onSelect={(v) => {
                                    field.onChange(v);
                                    setComboOpen(false);
                                  }}
                                >
                                  {s.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      field.value === s.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
