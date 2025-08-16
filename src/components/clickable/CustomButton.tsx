/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../shared/Spinner";
import { Button } from "../ui/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "transparent" | "white";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  label?: string;
  icon?: any;
}

export const CustomButton: FC<ButtonProps> = ({
  label,
  children,
  className,
  type = "button",
  variant = "primary",
  size = "lg",
  isLoading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "font-medium w-fit h-12 rounded-xl text-sm  transition-all  flex items-center justify-center gap-x-1 capitalize duration-300 ease-in font-medium disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-primary text-white border-primary hover:bg-primary/80 active:bg-primary/90 disabled:bg-primary/30",
    secondary:
      "bg-gray-600 text-white hover:bg-secondary/80 active:bg-secondary/90 disabled:bg-secondary/30",
    danger:
      "bg-transparent border border-error text-error hover:bg-transparent  active:bg-red-700 disabled:bg-red-700/30",
    transparent:
      "bg-transparent text-black/90 border hover:text-primary hover:bg-transparent active:text-primary/90 disabled:bg-primary/30",
    white:
      " bg-white text-secondary border hover:text-primary active:text-primary/90 disabled:bg-primary/30",
  };
  const sizes = {
    sm: "py-1 px-2 text-sm",
    md: "py-1.5 px-4 text-base",
    lg: "py-3 px-4 text-sm",
    xl: "py-3 px-6 text-xl",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    isLoading && "opacity-50 cursor-not-allowed ",
    className
  );

  return (
    <Button
      type={type}
      className={classes}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center gap-2">
          {children}
          {Icon && <Icon className="-mt-1" />}
        </div>
      )}
      {label}
    </Button>
  );
};
