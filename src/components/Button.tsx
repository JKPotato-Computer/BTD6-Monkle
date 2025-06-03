import { ReactNode } from "react";
import "../css/Button.css";

interface ButtonProps {
  children: ReactNode;
  color: "green" | "blue" | "red" | "yellow";
  type?: "icon";
  onClick?: () => void;
}

function Button({ children, color, type, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={
        "button " +
        ((type && (type == "icon" ? "p-3 " : "px-4 py-3 ")) || "px-4 py-3 ") +
        color +
        " " +
        type
      }
      onClick={onClick}
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
