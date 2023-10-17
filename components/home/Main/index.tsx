import React from "react";
import Menu from "./Menu";
import Welcome from "./Welcome";

const Main = () => {
  return (
    <div
      className="relative flex-1 bg-green-100 dark:bg-gray-700 dark:text-gray-100
    "
    >
      <Menu />
      <Welcome />
    </div>
  );
};

export default Main;
