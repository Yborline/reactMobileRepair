import * as yup from "yup";

export const validationFormModelSchema = yup.object().shape({
  model: yup.string().required("Це поле обов'язкове"),
});

export const validationFormBrandSchema = yup.object().shape({
  brand: yup.string().required("Це поле обов'язкове"),
  model: yup.string().required("Це поле обов'язкове"),
});
