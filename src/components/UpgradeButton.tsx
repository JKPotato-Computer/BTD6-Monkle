import { HTMLAttributes } from "react";
import "../css/UpgradeButton.css";

interface UpgradeButtonProps extends HTMLAttributes<HTMLButtonElement> {
  upgradeCrossPath: string;
  caption: string;
  selected?: boolean;
  eliminated?: boolean;
}

function UpgradeButton({
  upgradeCrossPath,
  caption,
  selected,
  eliminated,
  ...rest
}: UpgradeButtonProps) {
  return (
    <button
      type="button"
      className={"upgradeBtn " + (selected ? "selected" : "")}
      disabled={eliminated}
      {...rest}
    >
      {eliminated && (
        <div className="eliminated material-symbols-sharp">close</div>
      )}
      <img className="upgradeNum" src={upgradeCrossPath} />
      <span className="caption">{caption}</span>
    </button>
  );
}

export default UpgradeButton;
