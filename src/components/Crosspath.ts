import upgradeList from "../data/crosspaths.json";
import { getPuzzleNumber } from "./DailyPuzzle";

type MonkeyType = keyof typeof upgradeList;
type UpgradeType = [number, number, number];

export function upgradePathsToString(paths: UpgradeType) {
  return paths[0] + "-" + paths[1] + "-" + paths[2];
}

export function upgradePathsToArray(paths: string) {
  let pathUpgrades = paths.split("-");
  if (pathUpgrades.length < 3) {
    throw new Error("Incorrect upgrade paths: " + paths);
  } else {
    return pathUpgrades;
  }
}

type returnUpgrade = {
  classType: "Primary" | "Magic" | "Military" | "Support" | undefined;
  damage: any;
  pierce: any;
  attackSpeed: any;
  range: any;
  attackType: any;
  keywords: string[] | undefined;
  canSeeCamo: boolean | undefined;
  hasAbility: boolean | undefined;
  [key: string]: any;
};

export function compareCrosspaths(
  crosspath1: Record<string, any>,
  crosspath2: Record<string, any>
): boolean {
  const keys1 = Object.keys(crosspath1);
  const keys2 = Object.keys(crosspath2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (crosspath1[key] !== crosspath2[key]) {
      return false;
    }
  }

  return true;
}

export function shareClipboard(
  initialList: Record<string, any>[],
  correctUpgradesList: Record<string, any>
) {
  return (success: boolean) => {
    const colorToEmoji = (result: Record<string, any>) => {
      if (result.color === "green") return "🟩";
      if (result.color === "yellow") return "🟨";
      return "⬛";
    };

    const resultArray = [];
    console.log(initialList);
    for (let i = 0; i < initialList.length; i++) {
      let guess;
      if (i == initialList.length && success) {
        break;
      }
      guess = i == initialList.length ? correctUpgradesList : initialList[i];
      const result = compareCrosspathsDetailed(
        {
          classType: guess.classType,
          attackSpeed: guess.attackSpeed,
          damage: guess.damage,
          pierce: guess.pierce,
          range: guess.range,
          attackType: guess.attackType,
          keywords: guess.keywords,
        },
        {
          classType: correctUpgradesList.classType,
          attackSpeed: correctUpgradesList.attackSpeed,
          damage: correctUpgradesList.damage,
          pierce: correctUpgradesList.pierce,
          range: correctUpgradesList.range,
          attackType: correctUpgradesList.attackType,
          keywords: correctUpgradesList.keywords,
        }
      );

      if (result == null) {
        resultArray[i] = [];
        continue;
      }

      resultArray[i] = [
        colorToEmoji(result.classType),
        colorToEmoji(result.attackSpeed),
        colorToEmoji(result.damage),
        colorToEmoji(result.pierce),
        colorToEmoji(result.range),
        colorToEmoji(result.attackType),
        colorToEmoji(result.keywords),
      ];
    }
    const shareString =
      "BTD6 Monkle #" +
      getPuzzleNumber() +
      " " +
      (success ? initialList.length : "X") +
      "/10 \n" +
      resultArray
        .map((guess) => {
          return guess.join("");
        })
        .join("\n");
    navigator.clipboard.writeText(shareString);
    alert("Copied to clipboard!");
  };
}

function equals(a: number | string | any[], b: number | string | any[]) {
  /* 
  If a and b are numbers, return "less" if a < b, "greater" if a > b, and "equal" if a == b.
  If a and b are strings, return "equal" if a == b, and "notequal" otherwise.
  If a and b is an array of numbers, do the same step as the first - however, instead of returning you are to set that index in the array to "less"/"greater"/"equal" (return a new array).
  If a and b is an array of strings, do the same step as the second - however, instead of returning you are to set that index in the array to "equal"/"notequal" (return a new array). 
  */
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return "notequal";
    }
    return a.map((item, index) => {
      if (typeof item === "number" && typeof b[index] === "number") {
        return item < b[index] ? "less" : item > b[index] ? "greater" : "equal";
      } else if (typeof item === "string" && typeof b[index] === "string") {
        return item === b[index] ? "equal" : "notequal";
      } else {
        throw new Error("Mismatched types in arrays");
      }
    });
  } else if (typeof a === "number" && typeof b === "number") {
    return a < b ? "less" : a > b ? "greater" : "equal";
  } else if (typeof a === "string" && typeof b === "string") {
    return a === b ? "equal" : "notequal";
  }
}

export function compareCrosspathsDetailed(
  crosspath1: Record<string, any>,
  crosspath2: Record<string, any>
): Record<string, any> | null {
  const keys1 = Object.keys(crosspath1);
  const keys2 = Object.keys(crosspath2);

  if (keys1.length !== keys2.length) {
    return null;
  }

  let returnValue: Record<string, any> = {};

  // Class
  returnValue.classType = {
    value: crosspath1.classType,
    color:
      equals(crosspath1.classType, crosspath2.classType) === "equal"
        ? "green"
        : "red",
  };

  // Utility function
  const getStatComparison = (
    val1: any,
    val2: any,
    useYellowThreshold: boolean = false
  ) => {
    let result = equals(val1, val2);
    let color: "red" | "green" | "yellow" = "red";
    let isGreater;

    if (Array.isArray(result)) {
      const equalCount = result.filter((v) => v === "equal").length;
      if (equalCount === result.length) color = "green";
      else if (equalCount >= result.length / 2) color = "yellow";
    } else if (typeof result === "string") {
      if (result === "equal") color = "green";
      else if (
        result === "less" &&
        useYellowThreshold &&
        typeof val1 === "number" &&
        typeof val2 === "number" &&
        Math.abs(val1 - val2) / val2 <= 0.2
      ) {
        color = "yellow";
      }
      isGreater = result === "less";
    }

    return {
      value: val1,
      color,
      isGreater: color === "green" ? undefined : isGreater,
    };
  };

  returnValue.attackSpeed = getStatComparison(
    crosspath1.attackSpeed,
    crosspath2.attackSpeed,
    true
  );
  returnValue.damage = getStatComparison(crosspath1.damage, crosspath2.damage);
  returnValue.pierce = getStatComparison(crosspath1.pierce, crosspath2.pierce);
  returnValue.range = getStatComparison(
    crosspath1.range,
    crosspath2.range,
    true
  );

  // Attack Type
  let attackTypeResult = equals(crosspath1.attackType, crosspath2.attackType);
  let attackTypeColor: "red" | "green" | "yellow" = "red";
  if (Array.isArray(attackTypeResult)) {
    const equalCount = attackTypeResult.filter((v) => v === "equal").length;
    if (equalCount === attackTypeResult.length) attackTypeColor = "green";
    else if (equalCount >= attackTypeResult.length / 2)
      attackTypeColor = "yellow";
  } else if (attackTypeResult === "equal") {
    attackTypeColor = "green";
  }
  returnValue.attackType = {
    value: crosspath1.attackType,
    color: attackTypeColor,
  };

  // Keywords
  const arr1 = Array.isArray(crosspath1.keywords)
    ? crosspath1.keywords
    : undefined;
  const arr2 = Array.isArray(crosspath2.keywords)
    ? crosspath2.keywords
    : undefined;

  let found = 0;
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    arr1?.forEach((val: string) => {
      if (arr2?.includes(val)) found++;
    });
  }

  const length1 = arr1?.length || 0;
  const length2 = arr2?.length || 0;
  let keywordsColor: "green" | "yellow" | "red" = "red";
  let isGreater;

  if (length1 == length2 && found == length2) {
    keywordsColor = "green";
  } else if (length1 == length2 && Math.abs(found - length2) <= 1) {
    keywordsColor = "yellow";
    isGreater = found - length2 < 0;
  } else if (length1 != length2) {
    keywordsColor = "red";
    isGreater = length1 - length2 < 0;
  }

  returnValue.keywords = {
    value: [arr1, Array.isArray(arr1) ? arr1.length : 0],
    color: keywordsColor,
    isGreater: isGreater,
  };

  return returnValue;
}

export function getFullCrosspathUpgrade(
  monkey: MonkeyType,
  path: UpgradeType
): returnUpgrade {
  let upgradePath: returnUpgrade = {
    classType: undefined,
    damage: undefined,
    pierce: undefined,
    attackSpeed: undefined,
    range: undefined,
    attackType: undefined,
    keywords: undefined,
    canSeeCamo: undefined,
    hasAbility: undefined,
  };

  let crosspathsChecked: string[] = ["0-0-0"];
  function setCurrentCrosspath(crosspath: UpgradeType) {
    const monkeyData = upgradeList[monkey] as Record<string, any>;
    const crosspathKey = upgradePathsToString(crosspath);
    const crosspathData = monkeyData[crosspathKey];
    if (crosspathData && typeof crosspathData === "object") {
      for (const key of Object.keys(crosspathData)) {
        if (key == "keywords") {
          if (
            Array.isArray(crosspathData[key]) &&
            Array.isArray(upgradePath[key])
          ) {
            crosspathData[key].forEach((keyword: string) => {
              if (!upgradePath[key]?.includes(keyword)) {
                upgradePath[key] = [...(upgradePath[key] || []), keyword];
              }
            });
          } else {
            upgradePath[key] = crosspathData[key];
          }
          continue;
        }

        if (
          Object.keys(upgradePath).indexOf(key) != -1 &&
          upgradePath[key] == undefined
        ) {
          upgradePath[key] = crosspathData[key];
        }
      }
    }
  }

  function recursiveCrosspath(crosspath: UpgradeType, indexToModify: number) {
    if (crosspath[indexToModify] != 0) {
      crosspathsChecked.push(upgradePathsToString(crosspath));
    }
    setCurrentCrosspath(crosspath);
    crosspath[indexToModify]--;

    if (crosspath[indexToModify] < 0) {
      return;
    }

    crosspath.map((val: number, ind: number) => {
      if (val > 0 && ind != indexToModify) {
        let newPath = [...crosspath];
        if (
          crosspathsChecked.indexOf(
            upgradePathsToString(newPath as UpgradeType)
          ) != -1
        ) {
          return;
        }

        recursiveCrosspath([...crosspath], ind);
      }
    });

    recursiveCrosspath(crosspath, indexToModify);
  }

  path.map((val: number, ind: number) => {
    if (val > 0) {
      recursiveCrosspath([...path], ind);
    }
  });
  setCurrentCrosspath([0, 0, 0]);

  const allowedCategories = [
    "Primary",
    "Military",
    "Magic",
    "Support",
  ] as const;
  upgradePath.classType = allowedCategories.includes(
    upgradeList[monkey].category as (typeof allowedCategories)[number]
  )
    ? (upgradeList[monkey].category as (typeof allowedCategories)[number])
    : undefined;
  upgradePath.hasAbility = upgradePath.hasAbility || false;
  upgradePath.keywords = upgradePath.keywords || undefined;
  upgradePath.canSeeCamo = upgradePath.canSeeCamo || false;

  return upgradePath;
}

export type { MonkeyType, UpgradeType };
