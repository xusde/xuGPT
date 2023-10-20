import { sleeps } from "@/common/utils";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as MessageRequestBody;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const messageText = messages[messages.length - 1].content;
      for (let i = 0; i < messageText.length; i++) {
        await sleeps(100);
        controller.enqueue(encoder.encode(messageText[i]));
      }
      controller.close();
    },
  });
  return new Response(stream);
}
