import * as yup from "yup";

export const validationDateSchema = yup.object().shape({
  finishDay: yup.object().required("Це поле обов'язкове"),
  finishTime: yup.object().required("Це поле обов'язкове"),
});
