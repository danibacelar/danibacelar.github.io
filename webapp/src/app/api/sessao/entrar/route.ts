import { NextRequest, NextResponse } from "next/server";
import { claimSession } from "../../../lib/sessionStore";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const nome = body?.nome;
  const deviceToken = body?.deviceToken;

  if (typeof nome !== "string" || typeof deviceToken !== "string" || !nome || !deviceToken) {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  claimSession(nome, deviceToken);
  return NextResponse.json({ ok: true });
}
