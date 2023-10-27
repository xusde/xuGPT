"use client";
import React from "react";
import Menu from "./Menu";
import Welcome from "./Welcome";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useAppContext } from "@/components/AppContext";

const Main = () => {
  const {
    state: { selectedChat },
  } = useAppContext();
  return (
    <div className="relative flex-1">
      <main
        className=" h-full w-full overflow-y-auto bg-green-100 dark:bg-gray-700 dark:text-gray-100
    "
      >
        <Menu />
        <Message />
        {!selectedChat && <Welcome />}

        <ChatInput />
      </main>
    </div>
  );
};

export default Main;
