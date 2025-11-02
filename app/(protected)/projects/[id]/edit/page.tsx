import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  fetchAllTechsInWork,
  fetchOneProject,
  fetStepsToWorkByIdWork,
} from "@/app/lib/orders-data";
import FormEditProject from "@/app/components/projects/FormEditProject";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { fetchAllCompanies } from "@/app/lib/company-data";
import { fetchOneClient } from "@/app/lib/client-data";
import { formatDateTime } from "@/lib/formatDataTime";
import ListItemsDialog from "@/app/components/projects/ListItemsDialog";
import { Steps, User, Technicians } from "@/lib/types";
import FormEditStepToWork from "@/app/components/projects/FormEditStepToWork";
import DiagDeleteStepToWork from "@/app/components/projects/DiagDeleteStepToWork";
import DiagAddTechToWork from "@/app/components/projects/DiagAddTechToWork";
import { fetchAllTechs } from "@/app/lib/user-data";
import DiagDeleteTechFromWork from "@/app/components/projects/DiagDeleteTechFromWork";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }
  const params = await props.params;
  const project = await fetchOneProject(params.id);
  const client = await fetchOneClient(project.company.clientsId);
  const companies = await fetchAllCompanies();
  const steps: Steps[] = await fetStepsToWorkByIdWork(params.id);
  const techniciansInWork: Technicians[] = await fetchAllTechsInWork(params.id);
  const technicians: User[] = await fetchAllTechs();

  return (
    <>
      <HeaderSideBar
        title="Gestión de proyecto"
        before="Listado de proyectos"
        href="/projects/list"
      />

      <div className="flex text-xs md:text-sm flex-1 flex-col gap-4 p-2 md:p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-start rounded-xl bg-muted/50 md:min-h-min">
          <Card className="w-[100%] mt-2 mx-2">
            <CardHeader className="flex flex-col lg:flex-row justify-between">
              <div className="md:text-xl font-bold">Gestión de orden de trabajo</div>
              <div className="">
                <span className="text-sm md:text-base">Fecha de creación:</span>{" "}
                <span className="text-green-600 ">
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
              <div className="w-[100%] p-0 md:p-2 mt-4">
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2">
                  <legend className="font-bold">Técnicos encargados</legend>
                  <DiagAddTechToWork
                    idWork={params.id}
                    technicians={technicians}
                  />
                  {techniciansInWork.length > 0 &&
                    techniciansInWork.map((tech) => (
                      <div
                        key={tech.technician.id}
                        className="flex py-1  justify-between border w-full rounded-md"
                      >
                        <div className="flex items-center px-2  w-[70%] md:w-[90%] ">
                          {tech.technician.name}
                        </div>
                        <div className="flex flex-col md:flex-row items-center w-[30%] md:w-[10%] md:gap-4 gap-4 justify-center">
                          <DiagDeleteTechFromWork
                            techId={tech.technician.id}
                            workId={project.id}
                          />
                        </div>
                      </div>
                    ))}
                </fieldset>
              </div>
              <div className="w-[100%] p-0 md:p-2 mt-4">
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2">
                  <legend className="font-bold">Tareas</legend>

                  <ListItemsDialog idWork={params.id} />

                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="flex py-1  justify-between border w-full rounded-md"
                    >
                      <div className="flex items-center px-2 w-[70%] md:w-[90%] ">
                        {step.description}
                      </div>
                      <div className="flex flex-col md:flex-row items-center w-[30%] md:w-[10%] md:gap-4 gap-4 justify-center">
                        <FormEditStepToWork step={step} />
                        <DiagDeleteStepToWork step={step} />
                      </div>
                    </div>
                  ))}
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
