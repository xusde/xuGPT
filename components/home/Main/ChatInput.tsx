import Button from "@/components/common/Button";
import React, { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import TextareaAutoSize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

const ChatInput = () => {
  const [messageText, setMessageText] = useState("");
  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();
  const send = async () => {
    console.log("click send");
    const msg: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
    };

    const messages = messageList.concat(msg);
    const body: MessageRequestBody = { messages, model: currentModel };
    dispatch({ type: ActionType.ADD_MSG, message: msg });
    setMessageText("");
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      console.log(resp.statusText);
      return;
    }
    if (!resp.body) {
      console.log("no body");
      return;
    }
    const respMsg: Message = {
      id: uuidv4(),
      role: "gpt",
      content: "",
    };
    dispatch({ type: ActionType.ADD_MSG, message: respMsg });
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: respMsg.id,
    });
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      const res = await reader.read();
      done = res.done;
      const chunk = decoder.decode(res.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MSG,
        message: { ...respMsg, content },
      });
    }
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: "",
    });
    // setMessageText("");
  };

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 px-4">
        {messageList.length > 0 &&
          (streamingId !== "" ? (
            <Button
              icon={PiStopBold}
              variant="outline"
              className="bg-red-400 font-medium"
            >
              Stop generating
            </Button>
          ) : (
            <Button icon={MdRefresh} variant="primary" className="font-medium">
              Regenerating
            </Button>
          ))}

        <div className="shadow-[0_0_15px_rgba(0,0,0, 0.1)] flex w-full items-end rounded-lg border border-black/10 bg-white py-4 dark:border-gray-800/50 dark:bg-gray-700">
          <div className="mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="mb-1.5 max-h-64 flex-1 resize-none border-none bg-transparent text-black outline-none dark:text-white"
            placeholder="Enter a message"
            rows={1}
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <Button
            disabled={messageText.trim() === "" || streamingId !== ""}
            onClick={send}
            className="mx-3 rounded-lg"
            icon={FiSend}
            variant="primary"
          />
        </div>
      </div>

      <footer className="p-4 text-center text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} &nbsp;{" "}
        <a
          className="dakr:hover:border-gray-200/0 animated-underline border-b border-dotted border-black/60 py-[1px] font-medium hover:border-black/0 dark:border-gray-200"
          href="https://github.com/xusde"
          target="_blank"
        >
          xuSDE
        </a>
      </footer>
    </div>
  );
};

export default ChatInput;
