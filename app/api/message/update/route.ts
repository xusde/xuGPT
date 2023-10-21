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
// -----------------------------
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { id, ...data } = body;
//   if (!data.chatId) {
//     const chat = await prisma.chat.create({
//       data: {
//         title: "new chat",
//       },
//     });
//     data.chatId = chat.id;
//   }
//   const message = prisma.message.upsert({
//     where: { id },
//     update: data,
//     create: data,
//   });
//   console.log({ message });

//   //   return
//   return NextResponse.json({ code: 0, data: { message } });
// }
