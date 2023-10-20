import Button from "@/components/common/Button";
import React, { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import TextareaAutoSize from "react-textarea-autosize";

const ChatInput = () => {
  const [messageText, setMessageText] = useState("");
  const send = () => {};
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 px-4">
        <Button icon={MdRefresh} variant="primary" className="font-medium">
          Regenerate
        </Button>
        <div className="shadow-[0_0_15px_rgba(0,0,0, 0.1)] flex w-full items-end rounded-lg border border-black/10 bg-white py-4 dark:border-gray-800/50 dark:bg-gray-700">
          <div className="mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="mb-1.5 max-h-64 flex-1 resize-none border-none bg-transparent text-black outline-none dark:text-white"
            placeholder="Enter a message"
            rows={1}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button
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
