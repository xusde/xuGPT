"use client";
import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import React from "react";
import { MdLightMode, MdDarkMode, MdInfo } from "react-icons/md";

const Toolbar = () => {
  const {
    state: { theme },
    dispatch,
  } = useAppContext();

  return (
    <div className="absolute bottom-0 left-0 right-0  flex p-2 justify-between">
      <Button
        icon={theme === "light" ? MdLightMode : MdDarkMode}
        variant="text"
        onClick={() =>
          dispatch({
            type: ActionType.UPDATE,
            field: "theme",
            value: theme === "dark" ? "light" : "dark",
          })
        }
      ></Button>
      <Button icon={MdInfo} variant="text" />
    </div>
  );
};

export default Toolbar;
