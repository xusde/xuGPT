"use client";
import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import React from "react";
import { LuPanelLeft } from "react-icons/lu";

const Menu = () => {
  const {
    state: { displayNav },
    dispatch,
  } = useAppContext();

  return (
    <Button
      className={`${displayNav ? "hidden" : ""} : fixed left-2 top-2`}
      icon={LuPanelLeft}
      onClick={() =>
        dispatch({ type: ActionType.UPDATE, field: "displayNav", value: true })
      }
      variant="outline"
    />
  );
};

export default Menu;
