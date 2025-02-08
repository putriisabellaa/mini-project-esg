import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en-US" ||"id-ID" || "ch-CH"; 

  const response = NextResponse.json({ message: "Change Language!" });
  response.cookies.set("lang", lang, { path: "/", httpOnly: true });

  return response;
}
