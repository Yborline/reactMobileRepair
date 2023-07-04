import profitOnePhone from "../../../helpers/profitOnePhone";

const FinishResult = ({
  moneyRepair,
  moneyDiagnosis,
  moneyPurchase,
  repairPrice,
  sellPrice,
}) => {
  return (
    <>
      <p>Діагностика {moneyDiagnosis} грн.</p>
      <p>Ремонт {moneyRepair} грн.</p>
      <p>Запчастини {repairPrice} грн.</p>
      <p>Купівля {moneyPurchase} грн.</p>
      <p>Продаж {sellPrice} грн.</p>
      <p>
        Прибуток{" "}
        {profitOnePhone(
          moneyRepair,
          moneyDiagnosis,
          moneyPurchase,
          repairPrice,
          sellPrice
        )}{" "}
        грн.
      </p>
    </>
  );
};

export default FinishResult;
