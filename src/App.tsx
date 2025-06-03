import "./css/App.css";
import Button from "./components/Button";
import Currency from "./components/Currency";
import Container from "./components/Container";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-sm">
        <Container
          color="brown"
          id="titleContainer"
          className="navbar-brand d-flex flex-row gap-4 align-items-center"
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
        <Container color="brown" className="container-fluid p-2 gap-3">
          <Button color="blue" type="icon">
            question_mark
          </Button>
          <Button color="green" type="icon">
            settings
          </Button>
          <Currency type="coins" currency={0} />
        </Container>
      </nav>
      <img
        src="src/assets/Quincy.webp"
        height="400px"
        style={{
          transform: "translateX(-50%)",
          left: "50%",
          position: "absolute",
        }}
      />
    </>
  );
}

export default App;
