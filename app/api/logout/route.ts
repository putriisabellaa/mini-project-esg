import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // Gunakan await
  cookieStore.delete("token"); // Hapus cookie "token"

  return NextResponse.json({ message: "Logout berhasil" }, { status: 200 });
}
