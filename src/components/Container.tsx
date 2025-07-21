import { HTMLAttributes, ReactNode } from "react";
import "../css/Container.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  color: "brown" | "blue" | "gray" | "";
  children: ReactNode;
  className?: string;
  id?: string;
}

function Container({
  color,
  children,
  id,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={"container " + color + " " + className} id={id} {...rest}>
      {children}
    </div>
  );
}

export default Container;
