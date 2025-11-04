import { auth } from "@/auth";
import { NextRequest } from "next/server";

function mapUiToApi(filter: string): string | null {
  if (filter === "activos") return "ACTIVE";
  if (filter === "inactivos") return "INACTIVE";
  if (filter === "todos") return "TODOS"; // sin filtro
  return null;
}

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ filter: string }> }
) {
  const params = await props.params;
  const session = await auth();
  const token = session?.user?.accessToken;
  if (!token) {
    return new Response("No autorizado", { status: 401 });
  }

  const status = mapUiToApi(params.filter);

  // arma la URL de tu API Nest
  const base = `${process.env.API_URL}/api/reports/users`;
  const url = status === "TODOS" ? `${base}` : `${base}/${status}`;

  const apiRes = await fetch(url, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });


  if (!apiRes.ok) {
    const text = await apiRes.text();
    return new Response(`Error API (${apiRes.status}): ${text}`, {
      status: 500,
    });
  }

  // reenviar el PDF
  const pdfBuffer = await apiRes.arrayBuffer();
  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="users-report.pdf"',
    },
  });
}
