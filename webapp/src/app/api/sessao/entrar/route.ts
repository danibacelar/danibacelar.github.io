import { NextRequest, NextResponse } from "next/server";
import { claimSession } from "../../../lib/sessionStore";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  const deviceToken = body?.deviceToken;

  if (typeof email !== "string" || typeof deviceToken !== "string" || !email || !deviceToken) {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  claimSession(email, deviceToken);
  return NextResponse.json({ ok: true });
}
