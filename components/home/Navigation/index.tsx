"use client";
import React from "react";
import Menubar from "./Menubar";
import { useAppContext } from "@/components/AppContext";
import Toolbar from "./Toolbar";
import ChatList from "./ChatList";

const Navigation = () => {
  const {
    state: { displayNav },
  } = useAppContext();
  // const navres = useAppContext();
  // console.log({ navres });

  // const displayNav = true;
  return (
    <nav
      className={`${displayNav ? "" : "hidden"} relative 
      flex h-full
    w-[260px] flex-col bg-green-50 p-2 text-slate-500 dark:bg-gray-700`}
    >
      <Menubar />
      <ChatList />
      <Toolbar />
    </nav>
  );
};

export default Navigation;
