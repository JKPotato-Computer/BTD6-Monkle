import Button from "./Button";
import Container from "./Container";
import MonkeyImage from "./MonkeyImage";
import "../css/Stats.css";

interface StatsModalProps {
  closeEvent: () => void;
}

function StatsModal({ closeEvent }: StatsModalProps) {
  return (
    <>
      <div className="modal-body">
        <div className="row text-center gap-3">
          <Container color="brown" className="col p-3">
            <Container color="blue" className="fs-5 mb-3">
              Most Chosen Monkey
            </Container>

            <div className="row d-flex justify-content-center align-items-center">
              <MonkeyImage monkey="DartMonkey">
                <span className="mostChosenMonkey fs-5">0-2-3 Dart Monkey</span>
              </MonkeyImage>
            </div>
            <h4 className="mt-4 mb-2">Other First Guesses</h4>
            <Container
              color="brown"
              className="otherFirstGuesses overflow-auto"
            >
              {[...Array(10)].map((_, i) => (
                <div
                  className="d-flex align-items-center mb-2 px-4 py-2 border-bottom"
                  key={i}
                >
                  <MonkeyImage monkey="DartMonkey" scale={0.5} />
                  <span className="ms-3 fs-4">
                    Placeeeeeeeeeeholder Text {i + 1}
                  </span>
                </div>
              ))}
            </Container>
          </Container>

          <Container color="brown" className="col p-3">
            <Container color="blue" className="col fs-5">
              Accuracy
            </Container>
            <div
              className="position-relative d-flex justify-content-center align-items-center mb-3"
              style={{
                width: "150px",
                height: "150px",
                margin: "auto",
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>85%</span>
            </div>
            <div className="mb-3 d-flex justify-content-center gap-3">
              <div>Correct: 123</div>
              <div>Wrong: 17</div>
            </div>
            <table className="table table-sm text-start w-100">
              <thead>
                <tr>
                  <th># of Guesses</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{Math.floor(Math.random() * 50)}</td>
                  </tr>
                ))}
                <tr>
                  <td>XX</td>
                  <td>--</td>
                </tr>
              </tbody>
            </table>
          </Container>

          <div className="col p-3 d-flex flex-column gap-3">
            <Container color="brown" className="smallStats flex-grow-1">
              <Container color="blue" className="fs-5">
                Highest Streak
              </Container>
              <div className="d-flex align-items-center justify-content-center mb-2 fs-1">
                <span className="material-symbols-sharp me-2">
                  local_fire_department
                </span>
                <span>42</span>
                <span className="material-symbols-sharp ms-2">
                  local_fire_department
                </span>
              </div>
              <div>Lost on: 2024-11-01</div>
            </Container>

            <Container color="brown" className="smallStats flex-grow-1">
              <Container color="blue" className="fs-5">
                Mischellaneous
              </Container>
              <div>Total Puzzles Played: 156</div>
              <div>Total Guesses: 698</div>
            </Container>
          </div>
        </div>
      </div>
      <div className="modal-footer gap-3">
        <Button
          color="yellow"
          className="button yellow px-4 py-2 closeButton"
          onClick={closeEvent}
        >
          Export Data
        </Button>
        <Button
          color="red"
          className="button red px-4 py-2 closeButton"
          onClick={closeEvent}
        >
          Clear All Data
        </Button>
        <Button
          color="red"
          className="button red px-4 py-2 closeButton"
          onClick={closeEvent}
        >
          Close
        </Button>
      </div>
    </>
  );
}

export default StatsModal;
