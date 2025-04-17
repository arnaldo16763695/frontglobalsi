import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchOneProject, fetStepsToWorkByIdWork } from "@/app/lib/orders-data";
import FormEditProject from "@/app/components/projects/FormEditProject";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchAllCompanies } from "@/app/lib/company-data";
import { fetchOneClient } from "@/app/lib/client-data";
import { formatDateTime } from "@/lib/formatDataTime";
import ListItemsDialog from "@/app/components/projects/ListItemsDialog";

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const project = await fetchOneProject(params.id);
  const client = await fetchOneClient(project.company.clientsId);
  const companies = await fetchAllCompanies();
  const steps = await fetStepsToWorkByIdWork(params.id);

  return (
    <>
      <HeaderSideBar
        title="Gestión de proyecto"
        before="Listado de proyectos"
        href="/projects/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-start rounded-xl bg-muted/50 md:min-h-min">
          <Card className="md:w-[99%] w-[95%] mt-2">
            <CardHeader className="flex flex-col lg:flex-row justify-between">
              <div className="">Gestión de orden de trabajo</div>
              <div className="">
                <span className="text-sm md:text-base">Fecha de creación:</span>{" "}
                <span className="text-green-600 text-xs md:text-base">
                  {formatDateTime(project.createdAt)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <FormEditProject
                project={project}
                companies={companies}
                client={client}
              />
              <div className="border w-[60%] p-2">
                <fieldset className="border p-2">
                  <legend>Tareas</legend>
                  <ListItemsDialog steps={steps} idWork={params.id} />
                </fieldset>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProjectPage;
