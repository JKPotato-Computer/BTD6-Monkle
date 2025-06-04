import Button from "./Button";
import Container from "./Container";

interface GuessProps {
  color: "green" | "yellow" | "red";
  item:
    | "Attack Speed"
    | "Damage"
    | "Pierce"
    | "Range"
    | "Class"
    | "AffectsBloons"
    | "AffectsTowers"
    | "HasAbility";
  value: string | number | boolean;
  isVisible?: boolean;
}

function GuessPoint({ color, item, value, isVisible }: GuessProps) {
  if (
    item == "AffectsBloons" ||
    item == "AffectsTowers" ||
    item == "HasAbility"
  ) {
    if (isVisible) {
      return (
        <Container
          color=""
          className={
            "guess checkGuess buttonAppearance px-4 py-3 text-center " + color
          }
        >
          <div className="buttonForeground"></div>
          <div className="buttonTriangleShine"></div>
          <span>
            {(item == "HasAbility" && "Has an Ability") ||
              (item == "AffectsBloons" && "Has Bloon Effect") ||
              (item == "AffectsTowers" && "Has Tower Effect")}
          </span>
          <input
            className="form-check-input"
            type="checkbox"
            checked={value == true}
            disabled={true}
          />
        </Container>
      );
    } else {
      return (
        <Container
          color=""
          className={
            "guess checkGuess buttonAppearance px-4 py-3 text-center gap-3 " +
            color
          }
        >
          <div className="buttonForeground"></div>
          <div className="buttonTriangleShine"></div>
          <span>
            {(item == "HasAbility" && "Has an Ability") ||
              (item == "AffectsBloons" && "Has Bloon Effect") ||
              (item == "AffectsTowers" && "Has Tower Effect")}
          </span>
          <Button color="green" padding="px-4 py-3" style={{ zIndex: 2 }}>
            Reveal
          </Button>
        </Container>
      );
    }
  }

  return (
    <Container
      color=""
      className={"guess buttonAppearance px-4 py-3 text-center " + color}
    >
      <div className="buttonForeground"></div>
      <div className="buttonTriangleShine"></div>
      <span>
        {item}:{" " + value}
      </span>
      {}
    </Container>
  );
}

export default GuessPoint;
