
'use server'
import { loginSchema } from '@/lib/zod'
import { z } from "zod";
import bcrypt from 'bcryptjs';


export async function login(email: string | undefined, password: string | undefined) {

  return await fetch('http://localhost:4000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({ email, password }),
  })
}

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  console.log(values)
}


export async function userRegister(formData: FormData) {

  //encrypt password
  const passEncryp = await bcrypt.hash(formData.get('password') as string, 10);

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
    console.log("mi resultado->", user)
    return user;
  } catch (error) {
    console.log('error: ', error)
  }



}