import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchOneProject } from "@/app/lib/orders-data";
import { fetchAllTechsInWork } from "@/app/lib/orders-data";
import { Technicians } from "@/lib/types";
import { formatDateTime } from "@/lib/formatDataTime";
import { Steps } from "@/lib/types";
import { fethPendingStepsByIdWork } from "@/app/lib/orders-data";
import { fethFinishedStepsByIdWork } from "@/app/lib/orders-data";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const project = await fetchOneProject(params.id);
  const techniciansInWork: Technicians[] = await fetchAllTechsInWork(params.id);
  const stepsPending: Steps[] = await fethPendingStepsByIdWork(params.id);
  const stepsFinished: Steps[] = await fethFinishedStepsByIdWork(params.id);
  
  console.log("--->", stepsPending);
  console.log("--->", stepsFinished);
  return (
    <>
      <HeaderSideBar
        title="Detalle de la Orden"
        before="Listado de ordenes"
        href="/projects/technicians/list"
      />

      <div className="flex text-xs md:text-sm flex-1 flex-col gap-4 p-2 md:p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-start rounded-xl bg-muted/50 md:min-h-min">
          <Card className="w-[100%] mt-2 mx-2">
            <CardHeader className="flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="text-2xl">Gestión de orden de trabajo</div>
                <div className="text-sm">
                  Código:
                  <span className="text-green-600 ml-2">{project.workCode}</span>
                </div>
                <div className="text-sm">
                  Cliente:
                  <span className="text-green-600 ml-2">
                    {project.company.companyName}
                  </span>
                </div>
                <div className="text-sm">
                  Fecha de creación:
                  <span className="text-green-600 ml-2">
                    {formatDateTime(project.createdAt)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="w-[100%] flex gap-2 p-0 md:p-2 mt-4">
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                  <legend>Técnicos encargados</legend>

                  {techniciansInWork.length > 0 &&
                    techniciansInWork.map((tech) => (
                      <div
                        key={tech.technician.id}
                        className="flex  justify-between border w-full p-1 rounded-sm"
                      >
                        {tech.technician.name}
                      </div>
                    ))}
                </fieldset>
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                  <legend>Agregar Tareas</legend>
                  <div>tareas</div>
                </fieldset>
              </div>
              <div className="w-[100%] p-0 md:p-2 mt-4">
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                  <legend>Gestion de tareas</legend>
                  <div className="w-full flex flex-col md:flex-row gap-2 ">
                    <div className="border p-2 min-h-10 w-[50%] flex flex-col gap-1">
                      <span>Pendientes</span>
                          {stepsPending.map((step) => (
                            <div
                              key={step.id}
                              className="flex  justify-between border w-full p-1 rounded-sm"
                            >
                              {step.description}
                            </div>
                          ))}
                    </div>
                    <div className="border p-2 min-h-10 w-[50%]">
                      <span>Gestionadas</span>
                             {stepsFinished.map((step) => (
                            <div
                              key={step.id}
                              className="flex  justify-between border w-full p-1 rounded-sm"
                            >
                              {step.description}
                            </div>
                          ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
