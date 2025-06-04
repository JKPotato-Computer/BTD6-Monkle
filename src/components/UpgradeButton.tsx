import "../css/UpgradeButton.css";

interface UpgradeButtonProps {
  upgradeNum: number;
  caption: string;
}

function UpgradeButton({ upgradeNum, caption }: UpgradeButtonProps) {
  return (
    <button type="button" className="upgradeBtn">
      <span className="upgradeNum">{upgradeNum}</span>
      <span className="caption">{caption}</span>
    </button>
  );
}

export default UpgradeButton;
