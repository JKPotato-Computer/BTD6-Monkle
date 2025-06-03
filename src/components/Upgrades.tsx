import Container from "./Container";
import "../css/Upgrades.css";

function Upgrades() {
  return (
    <Container id="selectMonkeyUpgrades" color="brown">
      <div
        className="backgroundHexagons"
        style={{ backgroundSize: "15px 30px" }}
      ></div>
      <div className="backgroundGlow"></div>
      <div style={{ position: "relative", zIndex: "1", padding: "2%" }}>
        <Container color="blue">
          <span className="fs-3">Wolfpack Quincy :)</span>
        </Container>
        <img
          src="src/assets/Quincy.webp"
          height="175px"
          className="rotatingQuincy"
        ></img>
      </div>
    </Container>
  );
}

export default Upgrades;
