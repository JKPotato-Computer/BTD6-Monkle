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
    | "CanSeeCamo"
    | "HasAbility"
    | "Attack Type"
    | "Keywords";
  value: string | number | boolean | any[] | undefined;
  isVisible?: boolean;
  isGreater?: boolean;
  onClick?: () => void;
}

function GuessPoint({
  color,
  item,
  value,
  isVisible,
  isGreater,
  onClick,
}: GuessProps) {
  if (item == "Keywords") {
    let number: number;
    let list: string;

    if (!Array.isArray(value)) {
      throw new Error("Value for keywords must be an array.");
    }

    if (Array.isArray(value[0])) {
      number = value[1];
      list = (value[0] as string[])
        .map((val) => {
          return " " + val;
        })
        .toString();
    } else if (value[0] == undefined) {
      number = 0;
      list = "None";
    } else {
      throw new Error(
        "Unknown type. keyword value[0] must be an array or undefined."
      );
    }

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
            Keywords:{" "}
            {number +
              (isGreater != null && isGreater == true
                ? " (>)"
                : isGreater != null && isGreater == false
                ? " (<)"
                : "")}
          </span>
          <span className="p-2">{list}</span>
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
            Keywords:{" "}
            {number +
              (isGreater != null && isGreater == true
                ? " (>)"
                : isGreater != null && isGreater == false
                ? " (<)"
                : "")}
          </span>
          <Button
            color="green"
            padding="px-4 py-3"
            style={{ zIndex: 2 }}
            onClick={onClick}
          >
            Reveal
          </Button>
        </Container>
      );
    }
  }

  if (item == "CanSeeCamo" || item == "HasAbility") {
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
              (item == "CanSeeCamo" && "Can See Camo")}
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
              (item == "CanSeeCamo" && "Can See Camo")}
          </span>
          <Button
            color="green"
            padding="px-4 py-3"
            style={{ zIndex: 2 }}
            onClick={onClick}
          >
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
        {item}:
        {typeof value == "object"
          ? value.map((item, index) => {
              return (
                <>
                  <br />
                  {"Projectile #" + (index + 1) + ": " + item}
                </>
              );
            })
          : " " +
            value +
            (isGreater == true ? " (>)" : isGreater == false ? " (<)" : "")}
      </span>
      {}
    </Container>
  );
}

export default GuessPoint;
