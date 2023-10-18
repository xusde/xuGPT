import React, { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  icon?: IconType;
  variant?: "default" | "outline" | "text" | "primary";
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
      className={`inline-flex min-h-[38px] min-w-[38px] items-center rounded px-3 py-1.5
      ${
        variant === "default"
          ? "bg-gray-50 text-black hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
          : variant === "outline"
          ? "border border-gray-300 bg-gray-50 text-black hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          : variant === "primary"
          ? "bg-primary-500 text-white shadow-sm hover:bg-primary-600 hover:text-white"
          : "bg-transparent text-black hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
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
