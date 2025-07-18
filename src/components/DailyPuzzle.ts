import upgradesList from "../data/crosspaths.json";

const startDate = new Date(Date.UTC(2025, 7, 1)); // July 1, 2025

const validCrosspaths = [
  "0-0-0",
  "0-0-1",
  "0-0-2",
  "0-0-3",
  "0-0-4",
  "0-0-5",
  "0-1-0",
  "0-2-0",
  "0-3-0",
  "0-4-0",
  "0-5-0",
  "1-0-0",
  "2-0-0",
  "3-0-0",
  "4-0-0",
  "5-0-0",
  "3-1-0",
  "3-2-0",
  "3-0-1",
  "3-0-2",
  "4-1-0",
  "4-2-0",
  "4-0-1",
  "4-0-2",
  "5-1-0",
  "5-2-0",
  "5-0-1",
  "5-0-2",
  "1-3-0",
  "2-3-0",
  "0-3-1",
  "0-3-2",
  "1-4-0",
  "2-4-0",
  "0-4-1",
  "0-4-2",
  "1-5-0",
  "2-5-0",
  "0-5-1",
  "0-5-2",
  "1-0-3",
  "2-0-3",
  "0-1-3",
  "0-2-3",
  "1-0-4",
  "2-0-4",
  "0-1-4",
  "0-2-4",
  "1-0-5",
  "2-0-5",
  "0-1-5",
  "0-2-5",
  "0-1-1",
  "0-1-2",
  "0-2-1",
  "0-2-2",
  "1-1-0",
  "1-2-0",
  "2-1-0",
  "2-2-0",
  "1-0-1",
  "1-0-2",
  "2-0-1",
  "2-0-2",
];

// Simple PRNG: Linear Congruential Generator
function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Days since start (UTC midnight)
export function getPuzzleNumber(date: Date = new Date()): number {
  const utcNow = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return Math.floor((utcNow - startDate.getTime()) / 86400000);
}

// Main function: returns monkey name + crosspath
export function getDailyPuzzle() {
  const puzzleNumber = getPuzzleNumber();
  const rng = mulberry32(puzzleNumber); // puzzleNumber = day count from start

  const monkeyNames = Object.keys(upgradesList);
  const monkeyName = monkeyNames[Math.floor(rng() * monkeyNames.length)];
  const crosspath = validCrosspaths[Math.floor(rng() * validCrosspaths.length)];

  return {
    monkeyName,
    crosspath,
    puzzleNumber,
  };
}

export function getSecondsUntilNextPuzzle(): number {
  const now = new Date();
  const nextUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );
  return Math.floor((nextUTC.getTime() - now.getTime()) / 1000);
}

export function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}
