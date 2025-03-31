import FormAddCompany from '@/app/components/companies/FormAddCompany'
import HeaderSideBar from '@/app/components/HeaderSideBar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <>
    <HeaderSideBar 
      title="Registro de empresas"
      before="Listado de empresas"
      href="/companies/list"
    />
    

    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
        <Card className="md:w-[80%] w-[95%]">
          
          <CardHeader className='text-2xl font-bold'>Registro de empresa</CardHeader>
          <CardContent>
            <FormAddCompany />
          </CardContent>
        </Card>
      </div>
    </div>
  </>
  )
}

export default page