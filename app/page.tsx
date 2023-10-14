import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation";
import Image from "next/image";
import React from "react";

export default function Home() {
  const count = 4;
  return (
    <div className="h-full flex">
      <Navigation count={count} />
      <Main />
    </div>
  );
}
