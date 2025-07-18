import { useState } from "react";
import Button from "./Button";
import Container from "./Container";
import MultiOpenFAQAccordion from "./FAQ";

interface InfoModalProps {
  closeEvent: () => void;
}

function InfoModal({ closeEvent }: InfoModalProps) {
  const [currentPage, setCurrentPage] = useState<"about" | "faq">("about");

  return (
    <>
      <div className="modal-body">
        <div className="d-flex justify-content-between align-items-center gap-2 modalHeader">
          <Container
            color="brown"
            className="px-3 py-2 d-flex justify-content-center align-items-center headerTitle"
          >
            <span className="fs-1">Welcome to the BTD6 Monkle!</span>
          </Container>
          <Container
            color="blue"
            className="px-3 py-2 d-flex justify-content-center align-items-center gap-4 headerOptions"
          >
            <Button
              color={currentPage == "about" ? "yellow" : "blue"}
              padding="px-4 py-2"
              onClick={() => {
                setCurrentPage("about");
              }}
            >
              About
            </Button>
            <Button
              color={currentPage == "faq" ? "yellow" : "blue"}
              padding="px-4 py-2"
              onClick={() => {
                setCurrentPage("faq");
              }}
            >
              FAQ
            </Button>
          </Container>
        </div>
        <div
          id="aboutPage"
          className="modalPage px-2 py-3 fs-5"
          style={{ display: currentPage == "about" ? "block" : "none" }}
        ></div>
        <div
          id="faqPage"
          className="modalPage px-2 py-3 fs-5"
          style={{ display: currentPage == "faq" ? "block" : "none" }}
        >
          <MultiOpenFAQAccordion />
        </div>
      </div>
      <div className="modal-footer gap-4">
        <Button
          color="blue"
          className="button blue px-4 py-2"
          onClick={() => {
            window
              .open(
                "https://github.com/JKPotato-Computer/BTD6-Monkle",
                "_blank"
              )
              ?.focus();
          }}
        >
          View on GitHub
        </Button>
        <Button
          color="red"
          className="button red px-4 py-2 closeButton"
          onClick={closeEvent}
        >
          Close
        </Button>
      </div>
    </>
  );
}

export default InfoModal;
