import Container from "./Container";

function Guess() {
  return (
    <Container
      color=""
      className="guess buttonAppearance green px-4 py-2 text-center"
    >
      <div className="buttonForeground"></div>
      <div className="buttonTriangleShine"></div>
      <span>Category: Primary</span>
    </Container>
  );
}

export default Guess;
