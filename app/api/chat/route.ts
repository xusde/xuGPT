import { sleeps } from "@/common/utils";
import { sendMsgToGPT } from "@/lib/openai";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as MessageRequestBody;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const messageText = messages[messages.length - 1].content;
      console.log({ messageText });

      const respText = await sendMsgToGPT(messageText)!;
      console.log({ respText });

      for (let i = 0; i < respText.length; i++) {
        await sleeps(100);
        controller.enqueue(encoder.encode(respText[i]));
      }
      controller.close();
      // const messageText = messages[messages.length - 1].content;
      // console.log({ messageText });
      // for (let i = 0; i < messageText.length; i++) {
      //   await sleeps(100);
      //   controller.enqueue(encoder.encode(messageText[i]));
      // }
      // controller.close();
    },
  });
  return new Response(stream);
}
