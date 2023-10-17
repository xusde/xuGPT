import React from "react";
import Button from "@/components/common/Button";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

const Menubar = () => {
  const { dispatch } = useAppContext();
  return (
    <div className="flex space-x-3 justify-between">
      <Button icon={HiPlus} variant="outline" className="flex-1">
        {HiPlus} New Chat
      </Button>
      <Button
        icon={LuPanelLeft}
        onClick={() =>
          dispatch({
            type: ActionType.UPDATE,
            field: "displayNav",
            value: false,
          })
        }
        variant="outline"
      />
    </div>
  );
};

export default Menubar;
