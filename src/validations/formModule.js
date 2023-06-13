import * as yup from "yup";

const validationFormModelSchema = yup.object().shape({
  model: yup.string().required("Це поле обов'язкове"),
});

export default validationFormModelSchema;
