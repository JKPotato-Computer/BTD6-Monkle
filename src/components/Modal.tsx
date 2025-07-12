import { HTMLAttributes, ReactNode } from "react";
import Container from "./Container";
import "../css/Modal.css";

interface ModalProps extends HTMLAttributes<HTMLElement> {
  header: string;
  children: ReactNode;
}

function Modal({ header, children, ...rest }: ModalProps) {
  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-dialog modal-fullscreen">
        <Container className="container brown modal-header" color="brown">
          <span className="modal-title">{header}</span>
        </Container>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
