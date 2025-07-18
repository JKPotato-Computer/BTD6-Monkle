import { Dispatch, SetStateAction } from "react";
import Container from "./Container";
import GuessPoint from "./GuessPoint";
import Button from "./Button";
import { compareCrosspathsDetailed } from "./Crosspath";

interface GuessProps {
  classType: [
    "Primary" | "Military" | "Magic" | "Support",
    "Primary" | "Military" | "Magic" | "Support"
  ];
  attackSpeed: [number | any[], number | any[]];
  damage: [number | any[], number | any[]];
  pierce: [number | any[], number | any[]];
  range: [number | any[], number | any[]];
  attackType: [any[], any[]];
  keywords: [string[] | undefined, string[] | undefined, boolean];
  canSeeCamo: [boolean, boolean, boolean];
  hasAbility: [boolean, boolean, boolean];
  attemptedToGuess: string;
  guessNumber: number;
  revealEvent: Dispatch<SetStateAction<boolean>>[];
  correctGuess?: boolean | undefined;
  copyToClipboard?: (success: boolean) => void;
}

function Guess({
  classType,
  attackSpeed,
  damage,
  pierce,
  range,
  attackType,
  canSeeCamo,
  keywords,
  hasAbility,
  attemptedToGuess,
  guessNumber,
  revealEvent,
  correctGuess,
  copyToClipboard,
}: GuessProps) {
  const result = compareCrosspathsDetailed(
    {
      classType: classType[0],
      attackSpeed: attackSpeed[0],
      damage: damage[0],
      pierce: pierce[0],
      range: range[0],
      attackType: attackType[0],
      keywords: keywords[0],
    },
    {
      classType: classType[1],
      attackSpeed: attackSpeed[1],
      damage: damage[1],
      pierce: pierce[1],
      range: range[1],
      attackType: attackType[1],
      keywords: keywords[1],
    }
  );

  const classGP = (
    <GuessPoint
      item="Class"
      color={result?.classType.color}
      value={result?.classType.value}
    />
  );

  const attackSpeedGP = (
    <GuessPoint
      item="Attack Speed"
      color={result?.attackSpeed.color}
      value={result?.attackSpeed.value}
      isGreater={result?.attackSpeed.isGreater}
    />
  );

  const damageGP = (
    <GuessPoint
      item="Damage"
      color={result?.damage.color}
      value={result?.damage.value}
      isGreater={result?.damage.isGreater}
    />
  );

  const pierceGP = (
    <GuessPoint
      item="Pierce"
      color={result?.pierce.color}
      value={result?.pierce.value}
      isGreater={result?.pierce.isGreater}
    />
  );

  const rangeGP = (
    <GuessPoint
      item="Range"
      color={result?.range.color}
      value={result?.range.value}
      isGreater={result?.range.isGreater}
    />
  );

  const attackTypeGP = (
    <GuessPoint
      item="Attack Type"
      color={result?.attackType.color}
      value={result?.attackType.value}
    />
  );

  const keywordsGP = (
    <GuessPoint
      item="Keywords"
      color={result?.keywords.color}
      value={keywords == undefined ? keywords : result?.keywords.value}
      isVisible={keywords?.[2]}
      onClick={() => revealEvent[0](true)}
      isGreater={result?.keywords.isGreater}
    />
  );

  // Determine the number of correct guesses based off how many of the color values were green
  let correctGuesses = 0;
  if (classGP.props.color === "green") correctGuesses++;
  if (attackSpeedGP.props.color === "green") correctGuesses++;
  if (damageGP.props.color === "green") correctGuesses++;
  if (pierceGP.props.color === "green") correctGuesses++;
  if (rangeGP.props.color === "green") correctGuesses++;
  if (attackTypeGP.props.color === "green") correctGuesses++;
  if (keywordsGP.props.color === "green") correctGuesses++;

  const canSeeCamoGP = (
    <GuessPoint
      item="CanSeeCamo"
      color={
        canSeeCamo[2]
          ? canSeeCamo[0] == canSeeCamo[1]
            ? "green"
            : "red"
          : "yellow"
      }
      value={canSeeCamo[0]}
      isVisible={canSeeCamo[2]}
      onClick={() => {
        revealEvent[1](true);
      }}
    />
  );

  const hasAbilityGP = (
    <GuessPoint
      item="HasAbility"
      color={
        hasAbility[2]
          ? hasAbility[0] == hasAbility[1]
            ? "green"
            : "red"
          : "yellow"
      }
      value={hasAbility[0]}
      isVisible={hasAbility[2]}
      onClick={() => {
        revealEvent[2](true);
      }}
    />
  );

  if (correctGuess == null) {
    return (
      <Container color="brown" className="guessHolder p-2">
        <div className="fs-3">
          Guess #{guessNumber}: {correctGuesses}/7: {attemptedToGuess}
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          {classGP}
          {attackSpeedGP}
          {damageGP}
          {pierceGP}
          {rangeGP}
          {attackTypeGP}
          <div className="d-flex gap-2 align-items-stretch justify-content-center flex-wrap hints">
            {keywordsGP}
            {canSeeCamoGP}
            {hasAbilityGP}
          </div>
        </div>
      </Container>
    );
  } else if (correctGuess == true) {
    return (
      <Container color="brown" className="guessHolder p-2">
        <div className="fs-3 mb-2 gap-2 d-flex flex-column align-items-center justify-content-center">
          <Container color="blue" className="container blue p-2">
            <div className="row">
              <div className="col d-flex flex-column">
                <span className="fs-5 text-left">Correct Guess!</span>
                <span className="fs-6 text-left lh-1">
                  Got it in{" "}
                  {guessNumber + (guessNumber == 1 ? " attempt" : " attempts")}.
                </span>
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                <Button
                  color="yellow"
                  id="shareBtn"
                  onClick={
                    copyToClipboard
                      ? () => {
                          copyToClipboard(true);
                        }
                      : undefined
                  }
                >
                  Share!
                </Button>
              </div>
            </div>
          </Container>
          <span className="fs-5 text-center">
            Great job, now do a 2 million megapops challenge with it.
          </span>
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          {classGP}
          {attackSpeedGP}
          {damageGP}
          {pierceGP}
          {rangeGP}
          {attackTypeGP}
          <div className="d-flex gap-2 align-items-stretch justify-content-center flex-wrap hints">
            {keywordsGP}
            {canSeeCamoGP}
            {hasAbilityGP}
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container color="brown" className="guessHolder p-2">
        <div className="fs-3 mb-2 gap-2 d-flex flex-column align-items-center justify-content-center">
          <Container color="blue" className="container blue p-2">
            <div className="row">
              <div className="col d-flex flex-column">
                <span className="fs-5 text-left">Good try!</span>
                <span className="fs-6 text-left lh-1">
                  The answer was: {attemptedToGuess}.
                </span>
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                <Button
                  color="yellow"
                  id="shareBtn"
                  onClick={
                    copyToClipboard
                      ? () => {
                          copyToClipboard(false);
                        }
                      : undefined
                  }
                >
                  Share!
                </Button>
              </div>
            </div>
          </Container>
          <span className="fs-5 text-center">Better luck next time!</span>
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          {classGP}
          {attackSpeedGP}
          {damageGP}
          {pierceGP}
          {rangeGP}
          {attackTypeGP}
          <div className="d-flex gap-2 align-items-stretch justify-content-center flex-wrap hints">
            {keywordsGP}
            {canSeeCamoGP}
            {hasAbilityGP}
          </div>
        </div>
      </Container>
    );
  }
}

export default Guess;
