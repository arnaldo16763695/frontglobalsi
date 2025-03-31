'use client'
import toast from 'react-hot-toast'; 
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {  companyRegisterSchema } from "@/lib/zod";
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
import { companyRegister } from '@/app/lib/company-actions';

const FormAddCompany = () => {
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof companyRegisterSchema>>({
        resolver: zodResolver(companyRegisterSchema),
        defaultValues: {
            companyName: "",
            phone: "",
            email: "",
            rut: "",
            location: "",
            observations: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof companyRegisterSchema>) {

        const formData = new FormData()
        formData.append('companyName', values.companyName)
        formData.append('phone', values.phone)
        formData.append('email', values.email)
        formData.append('rut', values.rut)
        formData.append('location', values.location)
        formData.append('observations', values.observations)


        const res = await companyRegister(formData);

        if (res.error) {
            if (res.error === 'Conflict') {
                toast.error(res.message);
            }
        }else{
         toast.success('Registro creado exitosamente');
      
          router.push('/companies/list')
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
                </div>     
                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}

export default FormAddCompany