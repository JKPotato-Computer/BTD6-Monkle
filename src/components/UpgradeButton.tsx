import "../css/UpgradeButton.css";

interface UpgradeButtonProps {
  upgradeNum: number;
  caption: string;
  selected?: boolean;
  eliminated?: boolean;
}

function UpgradeButton({
  upgradeNum,
  caption,
  selected,
  eliminated,
}: UpgradeButtonProps) {
  return (
    <button
      type="button"
      className={"upgradeBtn " + (selected ? "selected" : "")}
      disabled={eliminated}
    >
      {eliminated && (
        <div className="eliminated material-symbols-sharp">close</div>
      )}
      <span className="upgradeNum">{upgradeNum}</span>
      <span className="caption">{caption}</span>
    </button>
  );
}

export default UpgradeButton;
