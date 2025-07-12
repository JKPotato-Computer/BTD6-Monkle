import "./css/App.css";
import Button from "./components/Button";
import Currency from "./components/Currency";
import Container from "./components/Container";
import { useEffect, useState } from "react";
import Upgrades from "./components/Upgrades";
import Guess from "./components/Guess";
import {
  MonkeyType,
  UpgradeType,
  getFullCrosspathUpgrade,
  upgradePathsToString,
  compareCrosspaths,
  compareCrosspathsDetailed,
  shareClipboard,
} from "./components/Crosspath.ts";

import { getDailyPuzzle, getPuzzleNumber } from "./components/DailyPuzzle.ts";
import TimeLeft from "./components/TimeLeft.tsx";
import upgradesList from "./data/crosspaths.json";
import Modal from "./components/Modal.tsx";

function App() {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000); // Initial check
  const [currentMonkeySelected, setCurrentMonkeySelected] =
    useState<MonkeyType>("DartMonkey");
  const [currentUpgradesSelected, setCurrentUpgradesSelected] =
    useState<UpgradeType>([0, 0, 0]);

  const [correctMonkey, setCorrectMonkey] = useState<MonkeyType>();
  const [correctUpgrades, setCorrectUpgrades] = useState<UpgradeType>();

  const [currentGuesses, setCurrentGuesses] = useState<Record<string, any>[]>(
    []
  );

  const [lockGuesses, setLockGuesses] = useState(false);

  const [revealKeywords, setRevealKeywords] = useState(false);
  const [revealCanSeeCamo, setRevealCanSeeCamo] = useState(false);
  const [revealAbility, setRevealAbility] = useState(false);

  const [streakNumber, setStreakNumber] = useState(
    parseInt(localStorage.getItem("streak") || "0")
  );

  const [lastGuessData, setLastGuessData] = useState<Record<string, any>[]>(
    () => {
      const item = localStorage.getItem("lastGuessData");
      return item ? JSON.parse(item) : [];
    }
  );

  const [timeData, setTimeData] = useState(() => {
    const item = localStorage.getItem("timeData");
    return item
      ? JSON.parse(item)
      : {
          lastPuzzleNumber: getPuzzleNumber(),
          hasSolved: false,
        };
  });

  const currentPuzzleNumber = getPuzzleNumber();

  useEffect(() => {
    localStorage.setItem("streak", streakNumber.toString());
  }, [streakNumber]);

  useEffect(() => {
    localStorage.setItem(
      "lastGuessData",
      JSON.stringify(lastGuessData, (_, v) => (v === undefined ? null : v))
    );
  }, [lastGuessData]);

  useEffect(() => {
    localStorage.setItem(
      "timeData",
      JSON.stringify(timeData, (_, v) => (v === undefined ? null : v))
    );
  }, [timeData]);

  useEffect(() => {
    if (timeData.lastPuzzleNumber < currentPuzzleNumber) {
      const newTimeData = {
        ...timeData,
        hasSolved: false,
        lastPuzzleNumber: currentPuzzleNumber,
      };

      setTimeData(newTimeData);

      if (timeData.lastPuzzleNumber !== currentPuzzleNumber - 1) {
        setStreakNumber(0);
      }

      setLastGuessData([]);
    } else if (timeData.lastPuzzleNumber === currentPuzzleNumber) {
      let areEqual = true;

      if (currentGuesses.length !== lastGuessData.length) {
        areEqual = false;
      } else {
        for (let i = 0; i < currentGuesses.length; i++) {
          const dict1 = currentGuesses[i];
          const dict2 = lastGuessData[i];

          const keys1 = Object.keys(dict1);
          const keys2 = Object.keys(dict2);

          if (keys1.length !== keys2.length) {
            areEqual = false;
            break;
          }

          for (let j = 0; j < keys1.length; j++) {
            const key = keys1[j];
            if (dict1[key] !== dict2[key]) {
              areEqual = false;
              break;
            }
          }

          if (!areEqual) break;
        }
      }

      if (!areEqual && lastGuessData.length > currentGuesses.length) {
        setCurrentGuesses([...lastGuessData]);
      } else if (!areEqual && lastGuessData.length < currentGuesses.length) {
        setLastGuessData([...currentGuesses]);
      }
    }
  }, [timeData, currentPuzzleNumber, lastGuessData, currentGuesses]);

  useEffect(() => {
    const { monkeyName, crosspath } = getDailyPuzzle();
    setCorrectMonkey(monkeyName as MonkeyType);
    setCorrectUpgrades(crosspath.split("-") as unknown as UpgradeType);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setContextMenuVisible(false);
      }
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!correctMonkey || !correctUpgrades) {
    return;
  }

  let correctUpgradesList = getFullCrosspathUpgrade(
    correctMonkey,
    correctUpgrades
  );

  return (
    <>
      <div>
        <Modal header="Info">Test</Modal>
      </div>
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
          <TimeLeft />
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
            bar_chart
          </Button>
          <Currency type="Streak" currency={streakNumber} />
        </Container>
      </nav>
      <div id="mainGame" className="d-flex flex-column gap-3">
        <Upgrades
          currentMonkeySelected={currentMonkeySelected}
          currentUpgradesSelected={currentUpgradesSelected}
          setCurrentMonkeySelected={setCurrentMonkeySelected}
          setCurrentUpgradesSelected={setCurrentUpgradesSelected}
        />
        <Container
          color="brown"
          className="d-flex align-items-center justify-content-center gap-3 p-3 guessControl flex-wrap"
        >
          <Container color="blue" id="guessesMade">
            <span className="fs-4">
              Guess {Math.min(10, currentGuesses.length + 1)}/10
            </span>
          </Container>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <Button
              color="red"
              id="clearBtn"
              onClick={() => {
                setCurrentUpgradesSelected([0, 0, 0]);
              }}
            >
              Clear
            </Button>
            <Button
              color="green"
              id="guessBtn"
              disabled={lockGuesses}
              onClick={() => {
                if (lockGuesses) {
                  return;
                }

                let crossPathUpgrade = getFullCrosspathUpgrade(
                  currentMonkeySelected,
                  currentUpgradesSelected
                );

                let wasCorrect = compareCrosspaths(
                  crossPathUpgrade,
                  correctUpgradesList
                );

                crossPathUpgrade.monkeyGuessed =
                  upgradePathsToString(currentUpgradesSelected) +
                  " " +
                  upgradesList[currentMonkeySelected].name;

                if (wasCorrect) {
                  setLockGuesses(true);
                  crossPathUpgrade.correctGuess = true;
                  setStreakNumber(streakNumber + 1);
                }

                currentGuesses.push(crossPathUpgrade);

                if (!wasCorrect && currentGuesses.length >= 10) {
                  setLockGuesses(true);
                  correctUpgradesList.monkeyGuessed =
                    upgradePathsToString(correctUpgrades) + " " + correctMonkey;
                  correctUpgradesList.correctGuess = false;
                  currentGuesses.push({ ...correctUpgradesList });
                  setStreakNumber(0);
                }

                setLastGuessData([...currentGuesses]);
                setCurrentGuesses([...currentGuesses]);
              }}
            >
              Guess!
            </Button>
          </div>
        </Container>
        <div
          id="guesses"
          className="d-flex flex-column-reverse gap-4 align-items-center"
        >
          {currentGuesses.map((guess, index) => {
            return (
              <Guess
                classType={[
                  guess.classType ?? "Primary",
                  correctUpgradesList.classType ?? "Primary",
                ]}
                attackSpeed={[
                  guess.attackSpeed,
                  correctUpgradesList.attackSpeed,
                ]}
                damage={[guess.damage, correctUpgradesList.damage]}
                pierce={[guess.pierce, correctUpgradesList.pierce]}
                range={[guess.range, correctUpgradesList.range]}
                attackType={[guess.attackType, correctUpgradesList.attackType]}
                canSeeCamo={[
                  guess.canSeeCamo,
                  !!correctUpgradesList.canSeeCamo,
                  revealCanSeeCamo,
                ]}
                keywords={[
                  guess.keywords,
                  correctUpgradesList.keywords,
                  revealKeywords,
                ]}
                hasAbility={[
                  guess.hasAbility,
                  !!correctUpgradesList.hasAbility,
                  revealAbility,
                ]}
                attemptedToGuess={guess.monkeyGuessed}
                guessNumber={index + 1}
                key={index + 1}
                revealEvent={[
                  setRevealKeywords,
                  setRevealCanSeeCamo,
                  setRevealAbility,
                ]}
                correctGuess={guess.correctGuess}
                copyToClipboard={
                  guess.correctGuess != null
                    ? shareClipboard(currentGuesses, correctUpgradesList)
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
