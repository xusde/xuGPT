import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, ...data } = body;
  if (!data.chatId) {
    const chat = await prisma.chat.create({
      data: {
        title: "new chat",
      },
    });
    data.chatId = chat.id;
  } else {
    await prisma.chat.update({
      data: {
        updatedAt: new Date(),
      },
      where: {
        id: data.chatId,
      },
    });
  }
  const message = await prisma.message.upsert({
    where: {
      id,
    },
    create: data,
    update: data,
  });
  return NextResponse.json({ code: 0, data: { message } });
}
