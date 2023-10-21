import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  // if id not exist
  if (!id) {
    return NextResponse.json({ code: -1, message: "id is required" });
  }
  await prisma.message.delete({
    where: {
      id,
    },
  });
  // delete success
  return NextResponse.json({ code: 0, message: "delete success" });
}
