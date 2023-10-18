import React from "react";
import Menu from "./Menu";
import Welcome from "./Welcome";
import Example from "./Example";
import ChatInput from "./ChatInput";
import Message from "./Message";

const Main = () => {
  return (
    <div className="relative flex-1">
      <main
        className=" h-full w-full overflow-y-auto bg-green-100 dark:bg-gray-700 dark:text-gray-100
    "
      >
        <Menu />
        <Message />
        {/* <Welcome /> */}
        <ChatInput />
      </main>
    </div>
  );
};

export default Main;
