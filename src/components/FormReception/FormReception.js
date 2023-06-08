import { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import { Stack } from "@mui/joy";
import Input from "@mui/joy/Input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import RadioClick from "./RadioClick";
import { Form, MarginItem, StyledTextarea } from "./FormReception.styled";
import "dayjs/locale/uk";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import validationSchema from "../../validations/formReception";

const telephones = [
  { brand: "apple", id: 1 },
  { brand: "xiomi", id: 2 },
  { brand: "realme", id: 3 },
  { brand: "doogee", id: 4 },
];

const models = [
  { model: "iphone 11", id: 1 },
  { model: "iphone 12", id: 2 },
  { model: "iphone 13", id: 3 },
  { model: "iphone 14", id: 4 },
  { model: "iphone 10", id: 5 },
  { model: "iphone 9", id: 6 },
  { model: "iphone 8", id: 7 },
];

const FormReception = () => {
  const initial = {
    brand: null,
    model: "",
    numberPhone: "",
    name: "",
    action: "diagnosis",
    finishDay: null,
    finishTime: null,
    money: "",
    description: "",
  };

  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationSchema}
      onSubmit={(values, formikProps) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        options,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <Form
          id="form"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* <div> */}
          <MarginItem spacing={2}>
            <div>
              <Autocomplete
                type="text"
                name="brand"
                placeholder="Бренд"
                value={values.brand}
                options={telephones}
                onBlur={handleBlur}
                getOptionLabel={(option) => option.brand}
                onChange={(event, newValue) => setFieldValue("brand", newValue)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              {errors.brand && touched.brand && errors.brand}
            </div>

            <div>
              <Autocomplete
                type="text"
                name="model"
                placeholder="Модель"
                disabled={values.brand !== null ? false : true}
                options={models}
                onChange={(event, newValue) => setFieldValue("model", newValue)}
                getOptionLabel={(option) => option.model}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />

              {errors.model && touched.model && errors.namodelme}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Ім'я клієнта "
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              {errors.name && touched.name && errors.name}
            </div>
            <div>
              <Input
                type="number"
                name="numberPhone"
                // onChange={(event) => setCash(event.target.value)}
                onChange={handleChange}
                value={values.numberPhone}
                placeholder="Номер телефону"
              />
              {errors.numberPhone && touched.numberPhone && errors.numberPhone}
            </div>

            <RadioClick setField={setFieldValue} />
            {values.action !== "purchase" && (
              <LocalizationProvider
                adapterLocale="uk"
                dateAdapter={AdapterDayjs}
              >
                <MarginItem spacing={2}>
                  <div>
                    <DatePicker
                      onChange={(event) => setFieldValue("finishDay", event)}
                      minDate={dayjs()}
                      label="Дата закінчення робіт"
                      sx={{ width: "100%" }}
                    />
                    {errors.finishDay && touched.finishDay && errors.finishDay}
                  </div>
                  <div>
                    <TimePicker
                      disabled={values.finishDay !== null ? false : true}
                      minutesStep={10}
                      ampm={false}
                      label="Час закінчення робіт"
                      value={values.finishDay}
                      sx={{ width: "100%" }}
                      onChange={(event, newValue) =>
                        setFieldValue("finishTime", event)
                      }
                    />
                    {errors.finishTime &&
                      touched.finishTime &&
                      errors.finishTime}
                  </div>
                </MarginItem>
              </LocalizationProvider>
            )}

            <div>
              <Input
                type="number"
                name="money"
                // onChange={(event) => setCash(event.target.value)}
                onChange={handleChange}
                value={values.money}
                placeholder="Ціна"
              />
              {errors.money && touched.money && errors.money}
            </div>

            <div>
              <StyledTextarea
                onChange={handleChange}
                placeholder="Опис роботи"
                value={values.description}
                name="description"
              />

              {/* <Input
                type="text"
                name="description"
                // onChange={(event) => setCash(event.target.value)}
                onChange={handleChange}
                value={values.description}
                placeholder="Ціна"
              /> */}
              {errors.description && touched.description && errors.description}
            </div>

            <Button type="submit" variant="contained">
              sss
            </Button>
            {/* <Radio name="action" options={listJenisKelamin} /> */}
            {/* <Field component={RadioGroup} name="action"> */}
            {/* <RadioPositionEnd handleChange={setFieldValue} /> */}
            {/* </Field> */}
          </MarginItem>
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default FormReception;
