'use client'
import toast from 'react-hot-toast'; 
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { userRegisterSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userRegister } from "@/app/lib/users-actions";
import { useRouter } from 'next/navigation';
// import { loginAction } from "@/app/lib/users-actions";

const FormRegister = () => {
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof userRegisterSchema>>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof userRegisterSchema>) {

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('phone', values.phone)
        formData.append('email', values.email)
        formData.append('password', values.password)
        const res = await userRegister(formData);

        if (res.error) {
            if (res.error === 'Conflict') {
                toast.error(res.message);
            }
        }else{ 
         toast.success('Registro creado exitosamente');
      
          router.push('/users/list')
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="introduce tu contaseña" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default FormRegister