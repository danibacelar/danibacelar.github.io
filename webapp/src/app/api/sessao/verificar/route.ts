import { NextRequest, NextResponse } from "next/server";
import { isCurrentSession } from "../../../lib/sessionStore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nome = searchParams.get("nome") ?? "";
  const deviceToken = searchParams.get("deviceToken") ?? "";

  const ativo = isCurrentSession(nome, deviceToken);
  return NextResponse.json({ ativo });
}
