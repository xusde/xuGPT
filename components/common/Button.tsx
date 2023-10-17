import React, { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  icon?: IconType;
  variant: "default" | "outline" | "text";
} & ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  className = "",
  icon: Icon,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center min-w-[38px] min-h-[38px] px-3 py-1.5 rounded
      ${
        variant === "default"
          ? "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"
          : variant === "outline"
          ? "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          : "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
      }
      ${className}
      `}
      {...props}
    >
      {Icon && <Icon className={`text-lg ${children ? "mr-1" : ""}`} />}
      {children}
    </button>
  );
};

export default Button;
