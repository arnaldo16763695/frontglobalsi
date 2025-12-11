"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatDataTime";
import StepsBoard from "@/app/components/projects/StepsBoard";
import { Projects, Steps, Technicians } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import DialogWorkImages from "../DialogWorkImages";
import ListItemsDialog from "./ListItemsDialog";
import { SwitchInitProject } from "../SwitchInitProject";
import { SwitchFinishProject } from "../SwitchFinishProject";

function CardWork({
  project,
  techniciansInWork,
  stepsPending,
  stepsFinished,
}: {
  project: Projects;
  techniciansInWork: Technicians[];
  stepsPending: Steps[];
  stepsFinished: Steps[];
}) {
  
  
  const [pendingSteps, setPendingSteps] = useState<Steps[]>(stepsPending);
  const [finishedSteps, setFinishedSteps] = useState<Steps[]>(stepsFinished);

  const [progress, setProgress] = useState(
    (stepsFinished.length * 100) /
      [...stepsPending, ...stepsFinished].length || 0
  );

  const handleStepsChanged = (allSteps: Steps[]) => {
    const pending = allSteps.filter((s) => s.status === "PENDING");
    const finished = allSteps.filter((s) => s.status === "FINISHED");
    setPendingSteps(pending);
    setFinishedSteps(finished);
  };

  return (
    <Card className="w-[100%] mt-2 mx-2">
      <CardHeader className="flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4 md:mb-8">
          <div className="text-sm md:text-2xl">
            Gestión de orden de trabajo
          </div>
          <SwitchInitProject
            workId={project.id}
            isStartedWork={project.isStartedByTech}
          />
          {progress === 100 &&
            project.isStartedByTech &&
            !project.isFinishedByTech && (
              <SwitchFinishProject workId={project.id} />
            )}
        </div>

        <div className="flex flex-col gap-4  md:flex-row md:gap-0 justify-between">
          <div className="text-xs md:text-sm">
            Código:
            <span className="text-green-600 ml-2">{project.workCode}</span>
          </div>
          <div className="text-xs md:text-sm">
            Cliente:
            <span className="text-green-600 ml-2">
              {project.company.companyName}
            </span>
          </div>
          <div className="flex gap-2 text-xs md:text-sm">
            <Progress value={progress} className="w-32" />{" "}
            <span>{progress} %</span>
          </div>
          <div className="text-xs md:text-sm">
            Fecha de creación:
            <span className="text-green-600 ml-2">
              {formatDateTime(project.createdAt)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        {project.isStartedByTech && (
          <>
            <div className="w-[100%] flex flex-col md:flex-row gap-4 p-0 md:p-2 mt-4">
              <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                <legend className="text-xs md:text-sm font-bold">
                  Técnicos encargados
                </legend>

                {techniciansInWork.length > 0 &&
                  techniciansInWork.map((tech) => (
                    <div
                      key={tech.technician.id}
                      className="flex pl-8  justify-between  w-full border-b border-b-black dark:border-b-slate-500"
                    >
                      {tech.technician.name}
                    </div>
                  ))}
              </fieldset>
              <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                <legend className="text-xs md:text-sm font-bold">
                  Agregar
                </legend>
                {/* 👇 AQUÍ el técnico también puede agregar tareas */}
                <ListItemsDialog
                  idWork={project.id}
                  onStepsChanged={handleStepsChanged}
                />
                <DialogWorkImages idWork={project.id} />
              </fieldset>
            </div>

            <div className="w-[100%] p-0 md:p-2 mt-4">
              <div className="w-[100%] p-0 md:p-2 mt-4">
                <fieldset className="border p-2 md:px-4 md:py-2 space-y-2 w-[100%]">
                  <legend className="text-xs md:text-sm font-bold">
                    Gestión de tareas
                  </legend>

                  <StepsBoard
                    pending={pendingSteps}
                    finished={finishedSteps}
                    setPending={setPendingSteps}
                    setFinished={setFinishedSteps}
                    setProgress={setProgress}
                    projectId={project.id}
                  />
                </fieldset>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CardWork;
