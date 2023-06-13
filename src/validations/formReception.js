import * as yup from "yup";

export const validationSchema = yup.object().shape({
  brand: yup.object().required("Це поле обов'язкове"),
  model: yup.string().required("Це поле обов'язкове"),
  numberPhone: yup
    .string()
    .matches(
      /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
      "Перевірте правильність вводу номера"
    ),
  // .required("Це поле обов'язкове"),
  name: yup
    .string()
    .min(2, "Не менше 2 символів")
    .matches(
      /^[^ -\s=]([a-zа-яzабвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯіїюґҐІЮЇєЄжЖA-Z0-9@$!_\s,%*\-.#?& ]{1,100})$/,
      "Поле не  може починатися з пробілу або дефісу"
    )
    .max(40, "Не більше 40 символів")
    .required("Це поле обов'язкове"),
  action: yup.string().oneOf(["diagnosis", "repair", "purchase"]).required(""),
  finishDay: yup.object().required("Це поле обов'язкове"),
  finishTime: yup.object().required("Це поле обов'язкове"),
  money: yup
    .number()
    .min(10, "Не менше 10")
    .max(99999, "Не більше 99999")
    .positive("Не може бути сума менше за 0")
    .required("Це поле обов'язкове"),
  description: yup
    .string()
    .min(3, "не менше 3 символів")
    .required("Це поле обов'язкове"),
});

export const validationSchemaRepair = yup.object().shape({
  brand: yup.object().required("Це поле обов'язкове"),
  model: yup.string().required("Це поле обов'язкове"),
  numberPhone: yup
    .string()
    .matches(
      /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
      "Перевірте правильність вводу номера"
    ),
  // .required("Це поле обов'язкове"),
  name: yup
    .string()
    .min(2, "Не менше 2 символів")
    .matches(
      /^[^ -\s=]([a-zа-яzабвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯіїюґҐІЮЇєЄжЖA-Z0-9@$!_\s,%*\-.#?& ]{1,100})$/,
      "Поле не  може починатися з пробілу або дефісу"
    )
    .max(40, "Не більше 40 символів")
    .required("Це поле обов'язкове"),
  action: yup.string().oneOf(["diagnosis", "repair", "purchase"]).required(""),
  money: yup
    .number()
    .min(10, "Не менше 10")
    .max(99999, "Не більше 99999")
    .positive("Не може бути сума менше за 0")
    .required("Це поле обов'язкове"),
  description: yup
    .string()
    .min(3, "не менше 3 символів")
    .required("Це поле обов'язкове"),
});
