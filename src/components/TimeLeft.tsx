import { useState, useEffect } from "react";
import { formatCountdown, getSecondsUntilNextPuzzle } from "./DailyPuzzle";

function TimeLeft() {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilNextPuzzle());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return getSecondsUntilNextPuzzle(); // Reset at midnight UTC
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="resetHolder d-flex flex-column align-items-center justify-content-center p-2">
      <span>Resets in:</span>
      <span className="text">{formatCountdown(secondsLeft)}</span>
    </div>
  );
}

export default TimeLeft;
