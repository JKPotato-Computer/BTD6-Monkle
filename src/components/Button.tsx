import { HTMLAttributes, ReactNode } from "react";
import "../css/Button.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: "green" | "blue" | "red" | "yellow";
  type?: "icon";
  padding?: string;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string; // <-- Add this
}

function Button({
  children,
  color,
  type,
  onClick,
  padding,
  disabled,
  tooltip,
  ...rest
}: ButtonProps) {
  return (
    <div className="button-wrapper">
      <button
        type="button"
        disabled={disabled}
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
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  );
}


export default Button;
