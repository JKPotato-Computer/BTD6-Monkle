import Container from "./Container";
import "../css/Upgrades.css";
import UpgradeButton from "./UpgradeButton";
import Button from "./Button";
import upgradeList from "../data/crosspaths.json";
import { useState } from "react";

type MonkeyType = keyof typeof upgradeList;
type UpgradeType = [number, number, number];

function upgradePathsToString(paths: UpgradeType) {
  return paths[0] + "-" + paths[1] + "-" + paths[2];
}

function Upgrades() {
  const [currentMonkeySelected, setCurrentMonkeySelected] =
    useState<MonkeyType>("DartMonkey");
  const [currentUpgradesSelected, setCurrentUpgradesSelected] =
    useState<UpgradeType>([0, 0, 0]);

  let monkey = upgradeList[currentMonkeySelected];
  let upgrades =
    monkey[
      upgradePathsToString(currentUpgradesSelected) as keyof typeof monkey
    ];

  return (
    <Container id="selectMonkeyUpgrades" color="brown">
      <div
        className="backgroundHexagons"
        style={{ backgroundSize: "15px 30px" }}
      ></div>
      <div className="backgroundGlow"></div>
      <div style={{ position: "relative", zIndex: "1", padding: "2%" }}>
        <Container
          color="blue"
          className="container blue p-3 d-flex flex-row justify-content-center align-items-center"
        >
          <Button color="green" type="icon" padding="p-2 me-4">
            arrow_back
          </Button>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span id="selectedMonkey" className="fs-3 lh-1">
              {monkey.name}
            </span>
            <span className="fs-5 lh-1 hint">
              Select the correct tower & crosspaths.
            </span>
          </div>
          <Button color="green" type="icon" padding="p-2 ms-4">
            arrow_forward
          </Button>
        </Container>
        <div className="d-flex flex-row flex-wrap align-items-center gap-4">
          <div className="upgradeIcon d-flex flex-column gap-2">
            <div className="imageHolder py-4">
              <div className="bottomGrad"></div>
              <div className="rectangleGrad"></div>
              <span className="caption" id="selectedUpgradeName">
                {monkey.name}
              </span>
              <img src={monkey.img} height="200px" className="mx-3"></img>
            </div>
            <Container color="blue">
              Selected: {upgradePathsToString(currentUpgradesSelected)}
            </Container>
          </div>

          <div className="upgrades d-flex flex-grow-1 flex-column align-items-start justify-content-evenly gap-5 my-4">
            <div className="crosspath d-flex flex-row justify-content-between gap-3 topPath">
              <div className="crossPathLine"></div>
              <UpgradeButton upgradeNum={1} caption="A" />
              <UpgradeButton upgradeNum={2} caption="B" />
              <UpgradeButton upgradeNum={3} caption="C" selected={true} />
              <UpgradeButton upgradeNum={4} caption="D" />
              <UpgradeButton upgradeNum={5} caption="E" />
            </div>
            <div className="crosspath d-flex flex-row justify-content-between gap-3 middlePath">
              <div className="crossPathLine"></div>
              <UpgradeButton upgradeNum={1} caption="A" />
              <UpgradeButton upgradeNum={2} caption="B" />
              <UpgradeButton upgradeNum={3} caption="C" eliminated={true} />
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
