import Container from "./Container";
import "../css/Currency.css";

interface CurrencyProps {
  type: string;
  currency: number;
}

function Currency({ type, currency }: CurrencyProps) {
  return (
    <Container color="brown" className="currencyHolder">
      <span className={"text currencyVal " + type.toLowerCase()}>
        <span>{type}:</span>
        {" " + currency}
      </span>
    </Container>
  );
}

export default Currency;
