import * as yup from "yup";

const validationFormPrice = yup.object().shape({
  money: yup.number().required("Це поле обов'язкове"),
});

export default validationFormPrice;
