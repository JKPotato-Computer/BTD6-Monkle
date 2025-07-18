import Container from "./Container";
import "../css/Upgrades.css";
import UpgradeButton from "./UpgradeButton";
import Button from "./Button";
import upgradeList from "../data/crosspaths.json";
import { Dispatch, SetStateAction } from "react";
import {
  MonkeyType,
  UpgradeType,
  upgradePathsToString,
  getFullCrosspathUpgrade,
} from "./Crosspath.ts";

type UpgradeProps = {
  currentMonkeySelected: MonkeyType;
  currentUpgradesSelected: UpgradeType;
  setCurrentMonkeySelected: Dispatch<SetStateAction<MonkeyType>>;
  setCurrentUpgradesSelected: Dispatch<SetStateAction<UpgradeType>>;
};

function createCrossPaths(
  pathKeys: string[],
  monkey: (typeof upgradeList)[MonkeyType],
  currentMonkeySelected: string,
  currentUpgradesSelected: UpgradeType,
  setCurrentUpgradesSelected: Dispatch<SetStateAction<UpgradeType>>
) {
  let crosspathIndex =
    pathKeys[0] == "1-0-0" ? 0 : pathKeys[0] == "0-1-0" ? 1 : 2;
  let currentUpgrade = currentUpgradesSelected[crosspathIndex];

  return pathKeys.map((key: string, i: number) => {
    let upgradeNum = i + 1;
    let isSelected = currentUpgrade === upgradeNum;
    let isEliminated = false;
    if (
      upgradeNum >= 3 &&
      currentUpgradesSelected.some((val) => val >= 3) &&
      currentUpgrade < 3
    ) {
      isEliminated = true;
    } else if (
      currentUpgrade == 0 &&
      currentUpgradesSelected.filter((val) => val > 0).length >= 2
    ) {
      isEliminated = true;
    }

    let monkeyKeyType = key as keyof typeof monkey;

    return (
      <UpgradeButton
        key={key}
        upgradeCrossPath={
          typeof monkey[monkeyKeyType] === "object" &&
          monkey[monkeyKeyType] !== null &&
          "img" in (monkey[monkeyKeyType] as any)
            ? "src/assets/monkeys/" +
              currentMonkeySelected +
              "/" +
              (monkey[monkeyKeyType] as any).img
            : ""
        }
        caption={
          typeof monkey[monkeyKeyType] === "object" &&
          monkey[monkeyKeyType] !== null &&
          "name" in (monkey[monkeyKeyType] as any)
            ? (monkey[monkeyKeyType] as any).name
            : ""
        }
        selected={isSelected}
        eliminated={isEliminated}
        onClick={() => {
          const newUpgrades: UpgradeType = [...currentUpgradesSelected];
          if (currentUpgrade == upgradeNum) {
            newUpgrades[crosspathIndex] = 0;
            setCurrentUpgradesSelected(newUpgrades);
          } else {
            newUpgrades[crosspathIndex] = upgradeNum;
            setCurrentUpgradesSelected(newUpgrades);
          }
        }}
      />
    );
  });
}

function Upgrades({
  currentMonkeySelected,
  currentUpgradesSelected,
  setCurrentMonkeySelected,
  setCurrentUpgradesSelected,
}: UpgradeProps) {
  let monkey = upgradeList[currentMonkeySelected];

  let crosspaths;

  let topCrossPaths = createCrossPaths(
    ["1-0-0", "2-0-0", "3-0-0", "4-0-0", "5-0-0"],
    monkey,
    currentMonkeySelected,
    currentUpgradesSelected,
    setCurrentUpgradesSelected
  );
  let middleCrossPaths = createCrossPaths(
    ["0-1-0", "0-2-0", "0-3-0", "0-4-0", "0-5-0"],
    monkey,
    currentMonkeySelected,
    currentUpgradesSelected,
    setCurrentUpgradesSelected
  );
  let bottomCrossPaths = createCrossPaths(
    ["0-0-1", "0-0-2", "0-0-3", "0-0-4", "0-0-5"],
    monkey,
    currentMonkeySelected,
    currentUpgradesSelected,
    setCurrentUpgradesSelected
  );

  if (window.innerWidth < 1000) {
    crosspaths = (
      <div className="upgrades d-flex flex-grow-1 flex-row align-items-start justify-content-evenly gap-5 mx-4 mb-4">
        <div className="crosspath d-flex flex-column align-items-center justify-content-between topPath">
          <div className="crossPathLine"></div>
          {topCrossPaths}
        </div>
        <div className="crosspath d-flex flex-column align-items-center justify-content-between middlePath">
          <div className="crossPathLine"></div>
          {middleCrossPaths}
        </div>
        <div className="crosspath d-flex flex-column align-items-center justify-content-between bottomPath">
          <div className="crossPathLine"></div>
          {bottomCrossPaths}
        </div>
      </div>
    );
  } else {
    // Helper arrays for each path
    crosspaths = (
      <div className="upgrades d-flex flex-grow-1 flex-column align-items-start justify-content-evenly gap-5 my-4">
        <div className="crosspath d-flex flex-row justify-content-between gap-3 topPath">
          <div className="crossPathLine"></div>
          {topCrossPaths}
        </div>
        <div className="crosspath d-flex flex-row justify-content-between gap-3 middlePath">
          <div className="crossPathLine"></div>
          {middleCrossPaths}
        </div>
        <div className="crosspath d-flex flex-row justify-content-between gap-3 bottomPath">
          <div className="crossPathLine"></div>
          {bottomCrossPaths}
        </div>
      </div>
    );
  }
  return (
    <Container id="selectMonkeyUpgrades" color="brown">
      <div
        className="backgroundHexagons"
        style={{ backgroundSize: "15px 30px" }}
      ></div>
      <div className="backgroundGlow"></div>
      <div style={{ position: "relative", zIndex: "1", padding: "2% 0%" }}>
        <Container
          color="blue"
          className="container blue p-3 d-flex flex-row justify-content-center align-items-center"
        >
          <Button
            color="green"
            type="icon"
            padding="p-2 me-3"
            tooltip="Previous"
            onClick={() => {
              let currentIndex = Object.keys(upgradeList).indexOf(
                currentMonkeySelected
              );
              let nextIndex =
                (currentIndex + Object.keys(upgradeList).length - 1) %
                Object.keys(upgradeList).length;
              setCurrentMonkeySelected(
                Object.keys(upgradeList)[nextIndex] as MonkeyType
              );
            }}
          >
            arrow_back
          </Button>
          <select
            id="selectedMonkey"
            className="fs-3 lh-1 rounded-3 p-1 px-3"
            onChange={(event) => {
              setCurrentMonkeySelected(event.target.value as MonkeyType);
            }}
          >
            {Object.keys(upgradeList).map((monkeyName: string) => {
              return (
                <option
                  selected={currentMonkeySelected == monkeyName}
                  key={monkeyName}
                  value={monkeyName}
                >
                  {upgradeList[monkeyName as MonkeyType].name}
                </option>
              );
            })}
          </select>
          <Button
            color="green"
            type="icon"
            padding="p-2 ms-3"
            tooltip="Next"
            onClick={() => {
              let currentIndex = Object.keys(upgradeList).indexOf(
                currentMonkeySelected
              );
              let nextIndex =
                (currentIndex + 1) % Object.keys(upgradeList).length;
              setCurrentMonkeySelected(
                Object.keys(upgradeList)[nextIndex] as MonkeyType
              );
            }}
          >
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
              <img
                src={
                  "src/assets/monkeys/" +
                  currentMonkeySelected +
                  "/" +
                  monkey.img
                }
                height="200px"
                className="mx-3"
              ></img>
            </div>
            <Container color="blue">
              Selected: {upgradePathsToString(currentUpgradesSelected)}
            </Container>
          </div>
          {crosspaths}
        </div>
      </div>
    </Container>
  );
}

export default Upgrades;
export type { MonkeyType, UpgradeType };
