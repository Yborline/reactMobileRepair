import { createSelector } from "@reduxjs/toolkit";

export const getPhones = (state) => state.phones.items;
export const getLoading = (state) => state.phones.loading;
export const getFilter = (state) => state.phones.filter;
export const getFilterDate = (state) => state.phones.filterDate;
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

// export const findFinishPhones = createSelector(
//   [getTypesPhone, getFilter],
//   ({ purchases, diagnosis, repairs }, filter) => {
//     const normalizedFilter = filter.toLowerCase();
//     const filteredDiagnosis = diagnosis.finish.filter(
//       ({ brand, model, description, numberPhone, finishDay }) =>
//         `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
//           .toLowerCase()
//           .includes(normalizedFilter)
//     );
//     const filteredRepairs = repairs.finish.filter(
//       ({ brand, model, description, numberPhone, finishDay }) =>
//         `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
//           .toLowerCase()
//           .includes(normalizedFilter)
//     );
//     const filteredPurchases = purchases.finish.filter(
//       ({ brand, model, description, numberPhone, finishDay }) =>
//         `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
//           .toLowerCase()
//           .includes(normalizedFilter)
//     );
//     return { filteredDiagnosis, filteredRepairs, filteredPurchases };
//   }
// );

export const findFinishPhones = createSelector(
  [getTypesPhone, getFilter, getFilterDate],
  ({ purchases, diagnosis, repairs }, filter, filterDate) => {
    const dateFilterDiagnosis = diagnosis.finish.filter(({ finishDay }) =>
      finishDay.slice(3).toLowerCase().includes(filterDate)
    );
    console.log(dateFilterDiagnosis);

    const dateFilterRepairs = repairs.finish.filter(({ finishDay }) =>
      finishDay.slice(3).toLowerCase().includes(filterDate)
    );
    console.log(dateFilterRepairs);

    const dateFilterPurchases = purchases.finish.filter(({ finishDay }) =>
      finishDay.slice(3).toLowerCase().includes(filterDate)
    );

    return { dateFilterDiagnosis, dateFilterRepairs, dateFilterPurchases };
  }
);

export const filterPhones = createSelector(
  [findFinishPhones, getFilter],
  ({ dateFilterDiagnosis, dateFilterRepairs, dateFilterPurchases }, filter) => {
    const normalizedFilter = filter.toLowerCase();
    const filteredDiagnosis = dateFilterDiagnosis.filter(
      ({ brand, model, description, numberPhone, finishDay }) =>
        `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
          .toLowerCase()
          .includes(normalizedFilter)
    );
    const filteredRepairs = dateFilterRepairs.filter(
      ({ brand, model, description, numberPhone, finishDay }) =>
        `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
          .toLowerCase()
          .includes(normalizedFilter)
    );
    const filteredPurchases = dateFilterPurchases.filter(
      ({ brand, model, description, numberPhone, finishDay }) =>
        `${brand} ${model} ${description} ${numberPhone} ${finishDay}`
          .toLowerCase()
          .includes(normalizedFilter)
    );
    return { filteredDiagnosis, filteredRepairs, filteredPurchases };
  }
);
