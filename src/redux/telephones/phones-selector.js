import { createSelector } from "@reduxjs/toolkit";

export const getPhones = (state) => state.phones.items;
export const getLoading = (state) => state.phones.loading;

export const getTypesPhone = createSelector([getPhones], (phones) => {
  const { repair, diagnosis, purchase } = phones;

  const repairsFinish = repair?.filter(
    (item) => item.statusRepair === "finish"
  );
  const repairsStart = repair?.filter((item) => item.statusRepair === "start");
  const diagnosisFinish = diagnosis?.filter(
    (item) => item.statusRepair === "finish"
  );
  const diagnosisStart = diagnosis?.filter(
    (item) => item.statusRepair === "start"
  );
  const purchaseFinish = purchase?.filter(
    (item) => item.statusRepair === "finish"
  );
  const purchaseStart = purchase?.filter(
    (item) => item.statusRepair === "start"
  );

  return {
    repairs: { finish: repairsFinish, start: repairsStart },
    diagnosis: { finish: diagnosisFinish, start: diagnosisStart },
    purchases: { finish: purchaseFinish, start: purchaseStart },
  };
});
