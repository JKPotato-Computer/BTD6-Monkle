import React from "react";
import upgradeList from "../data/crosspaths.json";
import { MonkeyType } from "./Crosspath";
import "../css/MonkeyImage.css";

interface MonkeyImageProps {
  monkey: string;
  scale?: number;
  children?: React.ReactNode;
}

function MonkeyImage({ monkey, scale, children }: MonkeyImageProps) {
  return (
    <div
      className="monkeyImageOutermost rounded-4"
      style={{ "--scale": scale || 1 } as React.CSSProperties}
    >
      <div
        className="monkeyImageOuter rounded-4"
        style={{ "--scale": scale || 1 } as React.CSSProperties}
      >
        <div className="monkeyImageRectangle"></div>
        <div className="monkeyImageRectangle2"></div>
        <div
          className="monkeyImageBorder rounded-4"
          style={{ "--scale": scale || 1 } as React.CSSProperties}
        >
          <div
            className="monkeyImageInner rounded-4"
            style={{ "--scale": scale || 1 } as React.CSSProperties}
          >
            <img
              src={
                upgradeList[monkey as MonkeyType] != null
                  ? "assets/monkeys/" +
                    monkey +
                    "/" +
                    upgradeList[monkey as MonkeyType].img
                  : "assets/Quincy.webp"
              }
              className="monkeyImage"
              style={{ "--scale": scale || 1 } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default MonkeyImage;
