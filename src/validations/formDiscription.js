import * as yup from "yup";
const validationFormDescription = yup.object().shape({
  description: yup.string().required("Це поле обов'язкове"),
});

export default validationFormDescription;
