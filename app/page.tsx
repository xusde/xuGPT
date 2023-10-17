"use client";
import { useAppContext } from "@/components/AppContext";
import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation";
import React from "react";

export default function Home() {
  const {
    state: { theme },
  } = useAppContext();

  return (
    <div className={`${theme} h-full flex`}>
      <Navigation />
      <Main />
    </div>
  );
}
