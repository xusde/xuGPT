import React, { ComponentPropsWithoutRef } from "react";

const Button = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={`${className} border border-gray-200 px-3 py-1.5 hover:opacity-70 rounded-md active:opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
