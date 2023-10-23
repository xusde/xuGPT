import React from "react";

import { SiOpenai } from "react-icons/si";

import Markdown from "@/components/common/Markdown";
import { useAppContext } from "@/components/AppContext";

const Message = () => {
  const {
    state: { messageList, streamingId },
  } = useAppContext();

  return (
    <div className="w-full pb-48 pt-10 dark:text-gray-300">
      <ul>
        {messageList.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <li
              key={msg.id}
              className={`${
                isUser
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <div className="mx-auto flex w-full max-w-4xl space-x-6 px-4 py-6 text-lg">
                <div className="text-3xl leading-[1]">
                  {isUser ? "🙂" : <SiOpenai />}
                </div>
                <div className="flex-1">
                  <Markdown>{`${msg.content} ${
                    msg.id === streamingId ? "▍" : ""
                  }`}</Markdown>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Message;
