"use client";

import React from "react";
import { Projects } from "@/lib/types";

import { Company, Clients } from "@/lib/types";
import DiagEditStatusWork from "./DiagEditStatusWork";
import { DiagEditCopanyInWork } from "./DiagEditCopanyInWork";
import { ProgressWork } from "../Progress";
const FormEditProject = ({
  project,
  companies,
  client,
  progress,
}: {
  project: Projects;
  companies: Company[];
  client: Clients;
  progress: number;
}) => {
  return (
    <div className="flex-col">
      <div className="flex flex-col gap-2 text-xs md:text-xl">
        <div className="flex gap-1 justify-between p-2 ">
          <div className="p-1 md:p-2 flex gap-1 items-center border rounded-md">
            <div>
              <span className="text-sm md:text-base">Orden: </span>
            </div>
            <div>
              <span className="text-green-600 text-sm md:text-base">
                {project.workCode}
              </span>
            </div>
          </div>

          <div className="p-1 md:p-2 flex gap-1 items-center border rounded-md">
            <div>
              <span className=" text-sm md:text-base">Cliente: </span>
            </div>
            <div>
              <span className="text-green-600 text-sm md:text-base">
                {client.name}
              </span>
            </div>
          </div>

          <div className="p-1 md:p-2 flex gap-1 items-center border rounded-md ">
            <div>
              <span className=" text-sm md:text-base">
                Estado de la orden:{" "}
              </span>
            </div>
            <div>
              {
                <span
                  className={`text-sm md:text-base ${(() => {
                    switch (project.progress) {
                      case "NOT_STARTED":
                        return "text-red-600";
                      case "IN_PROGRESS":
                        return "text-yellow-600";
                      case "FINISHED":
                        return "text-green-600";
                      default:
                        return "text-gray-500";
                    }
                  })()}`}
                >
                  {(() => {
                    switch (project.progress) {
                      case "NOT_STARTED":
                        return "No iniciada";
                      case "IN_PROGRESS":
                        return "Iniciada";
                      case "FINISHED":
                        return "Finalizada";
                      default:
                        return project.progress;
                    }
                  })()}
                </span>
              }
              <DiagEditStatusWork
                projectId={project.id}
                initialStatus={project.progress}
              />
            </div>
          </div>

          <div className="p-1 md:p-2 flex gap-1 items-center border rounded-md">
            <div>
              <span className=" text-sm md:text-base">Empresa: </span>
            </div>
            <div>
              <span className="text-green-600 text-sm md:text-base">
                {project.company.companyName}
              </span>
              <DiagEditCopanyInWork
                companyId={project.companyId}
                companies={companies}
                idProject={project.id}
              />
            </div>
          </div>

          <div className="p-1 md:p-2 flex gap-2 items-center border rounded-md">
            <ProgressWork progress={progress}  />
            <span className="text-sm md:text-base">{progress} %</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProject;
