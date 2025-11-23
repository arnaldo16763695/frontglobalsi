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
      <div className="flex flex-col gap-2 text-xs md:text-sm">
        <div className="flex gap-1 flex-col md:flex-row justify-between p-2 ">
          <div className=" p-1 md:p-2 flex gap-1 items-center border rounded-md">
            <div>
              <span className="">Orden: </span>
            </div>
            <div>
              <span className="text-green-600">
                {project.workCode}
              </span>
            </div>
          </div>

          <div className="p-1  md:p-2 flex gap-1 items-center border rounded-md">
            <div>
              <span className="">Cliente: </span>
            </div>
            <div>
              <span className="text-green-600">
                {client.name}
              </span>
            </div>
          </div>

          <div className="p-1 md:p-2 flex gap-1 items-center border rounded-md ">
            <div className="">Estado de la orden: </div>
            <div className="flex items-center">
              {
                <span
                  className={` ${(() => {
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
              Empresa:
            </div>
            <div className="flex items-center">
              <span className="text-green-600">
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
            <ProgressWork progress={progress} />
            <span className="">{progress} %</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProject;
