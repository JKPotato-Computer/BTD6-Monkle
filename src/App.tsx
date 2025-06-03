import "./css/App.css";
import Button from "./components/Button";
import Currency from "./components/Currency";
import Container from "./components/Container";
import { useEffect, useState } from "react";
import Upgrades from "./components/Upgrades";

function App() {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Initial check

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setContextMenuVisible(false);
      }
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg justify-content-between gap-4">
        <Container
          color="brown"
          id="titleContainer"
          className="navbar-brand d-flex flex-row gap-4 align-items-center m-0"
        >
          <span>
            The <span>B</span>
            <span>TD</span>
            <span>6 </span>
            Monkle!
          </span>
          <div className="resetHolder d-flex flex-column align-items-center justify-content-center p-2">
            <span>Resets in:</span>
            <span className="text">00:00:00</span>
          </div>
        </Container>
        <Container color="brown" className="p-2 m-0" id="expandMenu">
          <Button
            color="yellow"
            type="icon"
            onClick={() => setContextMenuVisible(!contextMenuVisible)}
          >
            menu
          </Button>
        </Container>
        <Container
          color="brown"
          className="container-fluid p-2 gap-3 m-0"
          id="contextMenu"
          style={{
            display:
              (((isSmallScreen && contextMenuVisible) || !isSmallScreen) &&
                "flex") ||
              "none",
          }}
        >
          <Button color="blue" type="icon">
            question_mark
          </Button>
          <Button color="green" type="icon">
            settings
          </Button>
          <Currency type="Streak" currency={0} />
        </Container>
      </nav>
      <div id="mainGame" className="d-flex flex-column gap-3">
        <Upgrades />
        <Container color="brown" className="d-flex gap-3 p-3">
          <Container color="blue">
            <span className="fs-1">Guess 0/1</span>
          </Container>
          <Button color="red">Clear</Button>
          <Button color="green">Guess!</Button>
        </Container>
        <div
          id="guesses"
          className="d-flex flex-column gap-2 align-items-center"
        >
          <Container color="brown">
            <div className="m-1 fs-3">Guess #1: 2/5</div>
            <div className="d-flex flex-column gap-2 align-items-center">
              <Container
                color=""
                className="guess buttonAppearance green px-4 py-2 text-center"
              >
                <div className="buttonForeground"></div>
                <div className="buttonTriangleShine"></div>
                <span>Category: Primary</span>
              </Container>
              <Container
                color=""
                className="guess buttonAppearance green px-4 py-2 text-center"
              >
                <span>Damage: 60</span>
              </Container>
              <Container
                color=""
                className="guess buttonAppearance yellow px-4 py-2 text-center"
              >
                <span>Pierce: 30</span>
              </Container>
              <Container
                color=""
                className="guess buttonAppearance red px-4 py-2 text-center"
              >
                <span>Attack Speed: 15</span>
              </Container>
              <Container
                color=""
                className="guess buttonAppearance red px-4 py-2 text-center"
              >
                <span>Range: 50</span>
              </Container>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
