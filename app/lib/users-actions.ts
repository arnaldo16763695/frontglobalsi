
'use server'
import { loginSchema } from '@/lib/zod'
import { z } from "zod";
import { hash } from "bcryptjs";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';


export async function login(email: string | undefined) {

  const res = await fetch('http://localhost:4000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({ email }),
  })

  return res.json()
}



export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const { data, success } = loginSchema.safeParse(values);
  if (!success) {
    return {
      error: "inalid data",
    };
  }
  try {
    const user = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':

          return {
            message: 'Credenciales inválidas'
          }

        default:
          return {
            message: 'Hubo un error'
          }
      }
    }
    throw error;
  }
}


export async function userRegister(formData: FormData) {

  //encrypt password
  const passEncryp = await hash(formData.get('password') as string, 10);

  const data = {
    'name': formData.get('name'),
    'phone': formData.get('phone'),
    'email': formData.get('email'),
    'password': passEncryp,
  }

  try {
    const res = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const user = await res.json();
    // console.log("mi resultado->", user)
    revalidatePath('/users/list')
    return user;
  } catch (error) {
    console.log('error: ', error)
  }



}
export async function userEdit(id: string, formData: FormData) {

  const data = {
    'name': formData.get('name'),
    'phone': formData.get('phone'),
    'email': formData.get('email'),    
    'role': formData.get('role'),    
    'status': formData.get('status'),    
  }

  try {
    const res = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const user = await res.json();
     console.log("mi resultado->", user)
    revalidatePath('/users/list')
    return user;
  } catch (error) {
    console.log('error: ', error)
  }



}