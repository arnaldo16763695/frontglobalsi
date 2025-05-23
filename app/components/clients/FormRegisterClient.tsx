'use client'
import React from 'react';
import toast from 'react-hot-toast'; 
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {  clientRegisterSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { clientRegister } from '@/app/lib/clients-actions';
// import { loginAction } from "@/app/lib/users-actions";

const FormRegisterClient = () => {
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof clientRegisterSchema>>({
        resolver: zodResolver(clientRegisterSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            rut: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof clientRegisterSchema>) {

        const formData = new FormData()
        formData.append('name', values.name.trim())
        formData.append('phone', values.phone.trim())
        formData.append('email', values.email.trim())
        formData.append('rut', values.rut.trim())


        const res = await clientRegister(formData);

        if (res.error) {
            if (res.error === 'Conflict') {
                toast.error(res.message);
            }
        }else{
         toast.success('Registro creado exitosamente');
      
          router.push('/clients/list')
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                </div>
                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}

export default FormRegisterClient