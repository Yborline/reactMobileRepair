import { Section, Bttn } from "./Profit.styled";
import { useState } from "react";

const Profit = ({ items }) => {
  const [showInfo, setShowInfo] = useState(false);
  console.log(items);
  const priceRepair = items.reduce(
    (total, { repairPrice, moneyPurchase }) =>
      repairPrice + moneyPurchase + total,
    0
  );
  const totalIncome = items.reduce(
    (total, { moneyRepair, moneyDiagnosis, sellPrice }) =>
      moneyRepair + moneyDiagnosis + sellPrice + total,
    0
  );
  const totalProfit = totalIncome - priceRepair;

  return (
    <Section>
      <Bttn
        style={{ marginBottom: "10px" }}
        variant="contained"
        onClick={() => setShowInfo(!showInfo)}
      >
        Прибуток за місяць
      </Bttn>
      {showInfo && (
        <>
          <p>Всього операцій = {items.length}</p>
          <p>Загальні витрати на матеріали = {priceRepair}</p>
          <p>Загальний дохід ={totalIncome}</p>
          <p>Загальний прибуток={totalProfit}</p>
        </>
      )}
    </Section>
  );
};

export default Profit;
