import Button from "./Button";
import Container from "./Container";
import MonkeyImage from "./MonkeyImage";
import "../css/Stats.css";
import AccuracyChart from "./AccuracyChart";
import { MonkeyType } from "./Crosspath";

type AnalyticData = {
  crosspathsGuessed: Record<string, number>;
  firstCrosspathGuesses: Record<string, number>;
  lastHighestStreak: {
    lostDate: number;
    streak: number;
  };
  totalAttempts: number[];
  totalPuzzlesPlayed: number;
};

interface StatsModalProps {
  closeEvent: () => void;
  data: AnalyticData;
}

function StatsModal({ closeEvent, data }: StatsModalProps) {
  let firstGuessedList: string[] = [];

  const sortedGuesses = Object.entries(data.firstCrosspathGuesses)
    .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort in descending order by value
    .map(([key]) => key); // Extract only the keys

  firstGuessedList = sortedGuesses.slice(0, Math.min(10, sortedGuesses.length));

  let totalGuessList: number = 0;
  let success: number = 0;
  let failed: number = 0;
  Object.keys(data.crosspathsGuessed).map((key: string) => {
    totalGuessList += data.crosspathsGuessed[key];
  });

  data.totalAttempts.map((val: number, ind: number) => {
    if (val == undefined) {
      return;
    }

    if (ind != 10) {
      success += val;
    } else {
      failed += val;
    }
  });

  let mostChosenStartingMonkey = firstGuessedList.length > 0 && (
    <>
      <div className="row d-flex justify-content-center align-items-center">
        <MonkeyImage monkey={firstGuessedList[0].split(":")[0] as MonkeyType}>
          <span className="mostChosenMonkey fs-5">
            {firstGuessedList[0].split(":")[1] +
              " " +
              firstGuessedList[0].split(":")[0]}
          </span>
        </MonkeyImage>
      </div>
      <h4 className="mt-4 mb-2">Other First Guesses</h4>
      <Container
        color="brown"
        className="otherFirstGuesses overflow-auto ps-4 pe-2"
      >
        <ol type="1" start={2} className="fs-3">
          {firstGuessedList
            .filter((_, i) => i > 0)
            .map((val: string, i: number) => (
              <li key={i}>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2 py-2">
                  <MonkeyImage
                    monkey={val.split(":")[0] as MonkeyType}
                    scale={0.5}
                  />
                  <span className="ms-3 fs-4 crosspathHistoryName">
                    {val.split(":")[1] + " " + val.split(":")[0]}
                  </span>
                </div>
              </li>
            ))}
        </ol>
      </Container>
    </>
  );

  return (
    <>
      <div className="modal-body">
        <div className="row text-center gap-3">
          <Container color="brown" className="col p-3">
            <Container color="blue" className="fs-5 mb-3">
              Most Chosen Starting Monkey
            </Container>

            {firstGuessedList.length == 0 ? (
              <span className="fs-4">
                maybe you should guess something first lol{" "}
                {firstGuessedList.length}
              </span>
            ) : (
              mostChosenStartingMonkey
            )}
          </Container>

          <Container color="brown" className="col p-3">
            <Container color="blue" className="fs-5 mb-3">
              Accuracy
            </Container>
            <AccuracyChart success={success} failed={failed} />
            <Container color="gray" className="accuracyTableHolder p-3">
              <table className="accuracyTable m-0 table table-sm text-center w-100">
                <thead>
                  <tr>
                    <th># of Guesses</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {data.totalAttempts.map((val, i) => (
                    <tr key={i}>
                      <td>{i == 10 ? "XX" : i + 1}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>
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
                <span className="streakNumber">
                  {data.lastHighestStreak.streak}
                </span>
                <span className="material-symbols-sharp ms-2">
                  local_fire_department
                </span>
              </div>
              <span className="fs-3">
                {data.lastHighestStreak.lostDate == 0
                  ? "someday you'll lose it :)"
                  : "Lost on" +
                    new Date(
                      data.lastHighestStreak.lostDate
                    ).toLocaleDateString("en-us")}
              </span>
            </Container>

            <Container color="brown" className="smallStats flex-grow-1">
              <Container color="blue" className="fs-5">
                Mischellaneous
              </Container>
              <span className="fs-3">
                Total Puzzles Played: {data.totalPuzzlesPlayed}
              </span>
              <span className="fs-3">Total Guesses: {totalGuessList}</span>
            </Container>
          </div>
        </div>
      </div>
      <div className="modal-footer gap-3">
        <Button color="yellow" className="button yellow px-4 py-2 closeButton">
          Export Data (unavliable)
        </Button>
        <Button color="red" className="button red px-4 py-2 closeButton">
          Clear All Data (unavaliable)
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
