import Container from "./Container";
import GuessPoint from "./GuessPoint";

function Guess() {
  return (
    <Container color="brown" className="guessHolder">
      <div className="m-1 fs-3">Guess #1: 2/5</div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <GuessPoint item="Class" color="green" value={"Primary"} />
        <GuessPoint item="Attack Speed" color="green" value={60} />
        <GuessPoint item="Damage" color="yellow" value={50} />
        <GuessPoint item="Pierce" color="red" value={40} />
        <GuessPoint item="Range" color="red" value={30} />
        <div className="gap-2 align-items-center justify-content-center">
          <GuessPoint
            item="AffectsBloons"
            color="green"
            value={true}
            isVisible={true}
          />
          <GuessPoint
            item="AffectsTowers"
            color="red"
            value={false}
            isVisible={true}
          />
          <GuessPoint
            item="HasAbility"
            color="green"
            value={true}
            isVisible={false}
          />
        </div>
      </div>
    </Container>
  );
}

export default Guess;
