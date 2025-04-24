import HeaderSideBar from "@/app/components/HeaderSideBar";
import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <>
      <HeaderSideBar
        title="Detalle de la Orden"
        before="Listado de ordenes"
        href="/projects/technicians/list"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">{params.id}</div>
    </>
  );
};

export default page;
