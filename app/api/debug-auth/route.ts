import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://apiglobal.ajedev.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "x@x.com", password: "123" }),
    });

    const text = await res.text();

    return NextResponse.json({
      status: res.status,
      body: text,
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        error: err.message,
        name: err.name,
        stack: err.stack,
      });
    }

    // fallback por si err no es una instancia de Error
    return NextResponse.json({ error: "Unknown error occurred" });
  }
}
