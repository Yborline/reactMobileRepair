const profitOnePhone = (
  moneyRepair,
  moneyDiagnosis,
  moneyPurchase,
  repairPrice,
  sellPrice
) => {
  const profit =
    sellPrice - moneyRepair - moneyDiagnosis - moneyPurchase - repairPrice;

  return profit;
};

export default profitOnePhone;
