import Container from "./Container";
import "../css/Upgrades.css";
import UpgradeButton from "./UpgradeButton";

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
          <span className="fs-3">Dart Monkey</span>
        </Container>
        <div className="d-flex flex-row align-items-center gap-4">
          <div className="upgradeIcon d-flex flex-column gap-2">
            <div className="imageHolder py-4">
              <div className="bottomGrad"></div>
              <div className="rectangleGrad"></div>
              <span className="caption" id="selectedUpgradeName">
                Wolfpack Quincy
              </span>
              <img src="src/assets/Quincy.webp" height="200px"></img>
            </div>
            <Container color="blue">Paragon</Container>
          </div>

          <div className="upgrades d-flex flex-grow-1 flex-column align-items-start justify-content-evenly gap-5 my-4">
            <div className="crosspath d-flex flex-row justify-content-between gap-3 topPath">
              <div className="crossPathLine"></div>
              <UpgradeButton upgradeNum={1} caption="A" />
              <UpgradeButton upgradeNum={2} caption="B" />
              <UpgradeButton upgradeNum={3} caption="C" />
              <UpgradeButton upgradeNum={4} caption="D" />
              <UpgradeButton upgradeNum={5} caption="E" />
            </div>
            <div className="crosspath d-flex flex-row justify-content-between gap-3 middlePath">
              <div className="crossPathLine"></div>
              <UpgradeButton upgradeNum={1} caption="A" />
              <UpgradeButton upgradeNum={2} caption="B" />
              <UpgradeButton upgradeNum={3} caption="C" />
              <UpgradeButton upgradeNum={4} caption="D" />
              <UpgradeButton upgradeNum={5} caption="E" />
            </div>
            <div className="crosspath d-flex flex-row justify-content-between gap-3 bottomPath">
              <div className="crossPathLine"></div>
              <UpgradeButton upgradeNum={1} caption="A" />
              <UpgradeButton upgradeNum={2} caption="B" />
              <UpgradeButton upgradeNum={3} caption="C" />
              <UpgradeButton upgradeNum={4} caption="D" />
              <UpgradeButton upgradeNum={5} caption="E" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Upgrades;
