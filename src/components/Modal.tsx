import { ReactNode } from "react";
import Container from "./Container";
import "../css/Modal.css";

interface ModalProps {
  header: string;
  children: ReactNode;
  visible: boolean;
}

function Modal({ header, children, visible }: ModalProps) {
  return (
    <div className="modal" style={{ display: visible ? "flex" : "none" }}>
      <div className="modal-dialog modal-fullscreen">
        <Container className="container brown modal-header" color="brown">
          <div className="modal-title">
            <span className="modal-title-span">{header}</span>
          </div>
        </Container>
        <Container
          className="container brown modal-content rounded-4"
          color="brown"
        >
          {children}
        </Container>
      </div>
    </div>
  );
}

export default Modal;
