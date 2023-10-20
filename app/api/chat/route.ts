import { sleeps } from "@/common/utils";
import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const { messageText } = await req.json();
//   const encoder = new TextEncoder();
//   // create a stream
//   const stream = new ReadableStream({
//     async start(controller) {
//       for (let i = 0; i < messageText.length; ++i) {
//         controller.enqueue(encoder.encode(messageText[i]));
//         // await sleep(100);
//       }
//       controller.close();
//     },
//   });

//   // return stream
//   return new Response(stream);
// }

export async function POST(request: NextRequest) {
  const { messageText } = await request.json();
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < messageText.length; i++) {
        await sleeps(100);
        controller.enqueue(encoder.encode(messageText[i]));
      }
      controller.close();
    },
  });
  return new Response(stream);
}
