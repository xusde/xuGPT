import React, { useMemo, useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import examples from "@/data/examples.json";
import Button from "@/components/common/Button";
import { useEventBusContext } from "@/components/EventBusContext";
const Example = () => {
  // local states
  const [showFull, setShowFull] = useState(false);
  const list = useMemo(() => {
    if (showFull) {
      return examples;
    } else {
      return examples.slice(0, 15);
    }
  }, [showFull]);
  const { publish } = useEventBusContext();

  return (
    <>
      <div className="mb-4 mt-20 text-4xl">
        <MdOutlineTipsAndUpdates />
      </div>
      <ul className="flex flex-wrap justify-center gap-3.5">
        {list.map((example) => {
          return (
            <li key={example.act}>
              <Button
                onClick={() => publish("createNewChat", example.prompt)}
                variant={"default"}
              >
                {example.act}
              </Button>
            </li>
          );
        })}
      </ul>
      {!showFull && (
        <>
          <p className="p-2">...</p>
          <div className="flex w-full items-center space-x-2">
            <hr className="flex-1 border-t border-dotted border-slate-500 dark:border-gray-600" />
            <Button
              variant="text"
              onClick={() => {
                setShowFull(true);
              }}
            >
              Show All
            </Button>
            <hr className="flex-1 border-t border-dotted  border-slate-500 dark:border-gray-600" />
          </div>
        </>
      )}
    </>
  );
};

export default Example;
