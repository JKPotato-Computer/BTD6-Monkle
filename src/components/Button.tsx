import { HTMLAttributes, ReactNode } from "react";
import "../css/Button.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: "green" | "blue" | "red" | "yellow";
  type?: "icon";
  padding?: string;
  onClick?: () => void;
}

function Button({
  children,
  color,
  type,
  onClick,
  padding,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={
        "button " +
        ((padding && padding + " ") ||
          (type && (type == "icon" ? "p-3 " : "px-4 py-2 ")) ||
          "px-4 py-2 ") +
        color +
        " " +
        type
      }
      onClick={onClick}
      {...rest}
    >
      <div className="buttonForeground"></div>
      <div className="buttonTriangleShine"></div>
      <div
        className={
          "text" + (type && type == "icon" ? " material-symbols-sharp" : "")
        }
      >
        {children}
      </div>
    </button>
  );
}

export default Button;
