import React from "react";
import { ButtonProps } from "../types/props";

const Button: React.FC<ButtonProps> = ({ onClick, children, style }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 absolute z-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
