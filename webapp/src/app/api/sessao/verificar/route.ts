import { NextRequest, NextResponse } from "next/server";
import { isCurrentSession } from "../../../lib/sessionStore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  const deviceToken = searchParams.get("deviceToken") ?? "";

  const ativo = isCurrentSession(email, deviceToken);
  return NextResponse.json({ ativo });
}
