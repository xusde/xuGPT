import React from "react";
import Menu from "./Menu";
import Welcome from "./Welcome";
import Example from "./Example";

const Main = () => {
  return (
    <div
      className="relative flex-1 overflow-y-auto bg-green-100 dark:bg-gray-700 dark:text-gray-100
    "
    >
      <Menu />
      <Welcome />
    </div>
  );
};

export default Main;
