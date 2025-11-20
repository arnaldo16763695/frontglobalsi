import { deleteImgFromDb } from "@/app/lib/orders-actions";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  const { imageKey, idImage } = await req.json();
  const utapi = new UTApi();

//   console.log(fileKey, '----', typeof fileKey );

  if (!imageKey) {
    return NextResponse.json({ error: "fileKey requerido" }, { status: 400 });
  }

  try {
    const result = await utapi.deleteFiles(imageKey);
    await deleteImgFromDb(idImage) 
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error borrando archivo:", error);
    return NextResponse.json({ error: "No se pudo borrar" }, { status: 500 });
  }
}
