import FormEditClient from "@/app/components/clients/FormEditClient";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchOneClient } from "@/app/lib/client-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edición de cliente',
};
const editClientPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const client = await fetchOneClient(params.id);
  return (
    <>
      <HeaderSideBar
        title="Edición de cliente"
        before="Listado de clientes"
        href="/clients/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] p-4 flex-1 flex justify-center items-center rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[60%] w-[95%]">
            <CardHeader>Edición de cliente</CardHeader>
            <CardContent>
              <FormEditClient client={client} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default editClientPage;
