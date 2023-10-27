import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ code: -1 });

  const deleteMsgs = prisma.message.deleteMany({
    where: {
      chatId: id,
    },
  });

  const deleteChat = prisma.chat.delete({
    where: { id },
  });
  await prisma.$transaction([deleteMsgs, deleteChat]);
  return NextResponse.json({ code: 0 });
}
