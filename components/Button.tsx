import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", children, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-80 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
