"use client";

import React from "react";
import { Button } from "@/components/ui/button";


function FormCreateReportWork({idWork, setOpen}:{idWork:string, setOpen: (open: boolean)=>void}) {

  async function onSubmit(e: React.FormEvent<HTMLFormElement> ) {
   e.preventDefault();
  try {
    // Llamas directamente a tu ruta API en Next.js (que devuelve el PDF)
    const res = await fetch(`/api/reports/work/${idWork}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error al generar reporte: ${res.statusText}`);
    }

    // get  PDF as Blob
    const blob = await res.blob();

    // Create a temporal url to blob
    const url = window.URL.createObjectURL(blob);

    // create a hidden link
    const a = document.createElement("a");
    a.href = url;
    a.download = "clients-report.pdf"; // file name
    document.body.appendChild(a);
    a.click();

    // clear
    a.remove();
    window.URL.revokeObjectURL(url);

    setOpen(false)
  } catch (error) {
    console.error("Error descargando el reporte:", error);
  }
}


  return (
      <form onSubmit={onSubmit} className="space-y-6">
         <Button type="submit">Generar</Button>
      </form>
  );
}

export default FormCreateReportWork;
