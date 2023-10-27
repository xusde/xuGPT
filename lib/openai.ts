import axios from "axios";
export async function sendMsgToGPT(msg: string) {
  const options = {
    method: "POST",
    url: process.env.GPT_URL,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.GPT_KEY,
      "X-RapidAPI-Host": process.env.GPT_HOST,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: msg,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data.choices[0].message);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}
