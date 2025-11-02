import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";
import { fetchOneProject } from "@/app/lib/orders-data";
import { fetchAllTechsInWork } from "@/app/lib/orders-data";
import { Technicians } from "@/lib/types";
import { Steps } from "@/lib/types";
import { fethPendingStepsByIdWork } from "@/app/lib/orders-data";
import { fethFinishedStepsByIdWork } from "@/app/lib/orders-data";
import CardWork from "@/app/components/projects/CardWork";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const project = await fetchOneProject(params.id);
  const techniciansInWork: Technicians[] = await fetchAllTechsInWork(params.id);
  const stepsPending: Steps[] = await fethPendingStepsByIdWork(params.id);
  const stepsFinished: Steps[] = await fethFinishedStepsByIdWork(params.id);

  return (
    <>
      <HeaderSideBar
        title="Detalle de la Orden"
        before="Listado de ordenes"
        href="/projects/technicians/list"
      />

      <div className="flex text-xs md:text-sm flex-1 flex-col gap-4 p-2 md:p-4">
        <div className="min-h-[100vh] flex-1 flex justify-center items-start rounded-xl bg-muted/50 md:min-h-min">
          <CardWork project={project} techniciansInWork={techniciansInWork} stepsPending={stepsPending} stepsFinished={stepsFinished} />
        </div>  
      </div>
    </>
  );
};

export default page;
