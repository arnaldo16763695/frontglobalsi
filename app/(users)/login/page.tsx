import FormLogin from '@/app/components/users/FormLogin'
import { auth } from '@/auth'
import { ToggleTheme } from '@/components/ToggleTheme'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import React from 'react'

const loginPage = async () => {
    const session = await auth();
    if (session) {

        return redirect("/");

    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  sm:p-6 font-[family-name:var(--font-geist-sans)]">
            <div className='w-full text-right'>
                <ToggleTheme/>
            </div>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <Card>
                    <CardHeader>
                        Bienvenido
                    </CardHeader>
                    <CardContent>
                        <FormLogin />
                    </CardContent>

                </Card>
            </main>
        </div>
    )
}

export default loginPage