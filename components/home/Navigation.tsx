import React from "react";
import Button from "@/components/common/Button";

type Props = { count: number };
const Navigation = ({ count }: Props) => {
  return (
    <div className="h-full w-[260px] bg-slate-50 text-gray-300 p-2">
      <Button className="text-slate-700 border-slate-400">
        Create a new conversation
      </Button>
    </div>
  );
};

export default Navigation;
