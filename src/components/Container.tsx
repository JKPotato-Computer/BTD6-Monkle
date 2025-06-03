import { ReactNode } from "react";
import "../css/Container.css";

interface ContainerProps {
  color: "brown" | "blue";
  children: ReactNode;
  id?: string;
  className?: string;
}

function Container({ color, children, id, className }: ContainerProps) {
  return (
    <div className={"container " + color + " " + className} id={id}>
      {children}
    </div>
  );
}

export default Container;
