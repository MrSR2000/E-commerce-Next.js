"use client";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import React from "react";
import { IconType } from "react-icons";

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 rounded-md
       ${outline ? "bg-white" : "bg-slate-700"} 
       ${outline ? "text-slate-700" : "text-white"} 
       ${small ? "text-sm font-light" : "text-md font-semibold"} 
       ${small ? "px-2 py-1 border-[1px]" : "py-3 px-4 border-[2px]"}
       ${custom ? custom : ""}
       `}>
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
