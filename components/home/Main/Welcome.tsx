import React from "react";
import ModelSelect from "./ModelSelect";
import Example from "./Example";

const Welcome = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20">
      <ModelSelect />
      <h1 className="mt-20 text-4xl font-bold">
        ChatGPT For Free - GPT4 & GPT 3.5-turbo
      </h1>
      <Example />
    </div>
  );
};

export default Welcome;
