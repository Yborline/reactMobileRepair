const choiceMoney = (value) => {
  switch (value) {
    case "repair":
      return "moneyRepair";
    case "diagnosis":
      return "moneyDiagnosis";
    case "purchase":
      return "moneyPurchase";
    default:
      return "moneyDiagnosis";
  }
};
export default choiceMoney;
