import { useEffect, useState } from "react";
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
import {
  validationSchema,
  validationSchemaRepair,
} from "../../validations/formReception";
import { getAllbrand } from "../../services/api";
import Modal from "../Modal/Modal";
import FormModel from "./FormModel/FormModel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { addTelephones } from "../../redux/telephones/phones-operations";
import TransitionAlerts from "../Alert/AlertSuccess";
import { normalDate } from "../../hooks/normalDate";
// const telephones = [
//   { brand: "apple", id: 1 },
//   { brand: "xiomi", id: 2 },
//   { brand: "realme", id: 3 },
//   { brand: "doogee", id: 4 },
// ];

// const models = [
//   { model: "iphone 11", id: 1 },
//   { model: "iphone 12", id: 2 },
//   { model: "iphone 13", id: 3 },
//   { model: "iphone 14", id: 4 },
//   { model: "iphone 10", id: 5 },
//   { model: "iphone 9", id: 6 },
//   { model: "iphone 8", id: 7 },
// ];

const initial = {
  brand: null,
  model: null,
  numberPhone: "",
  name: "",
  status: "diagnosis",
  finishDay: null,
  finishTime: null,
  money: "",
  description: "",
};

const FormReception = () => {
  const [showModal, setShowModal] = useState(false);
  const [telephones, setTelephones] = useState([]);
  const [validation, setValidation] = useState("normal");
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  console.log(telephones);

  console.log(validation);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getAllbrand().then((data) => setTelephones(data.allBrand));
    // console.log(data);
  }, []);

  const handlerAutocomplate = (setFieldValue, text, data, other) => {
    setFieldValue(text, data);
    setFieldValue(other, null);
  };

  // const normalDate = (finishTime) => {
  //   if (finishTime === null) {
  //     return null;
  //   }
  //   const { $y: year, $M: month, $D: day, $H: hour, $m: minutes } = finishTime;
  //   const newMounth = month.toString().length === 1 ? `0${month + 1}` : month;
  //   const d = day.toString().length === 1 ? `0${day}` : day;
  //   const h = hour.toString().length === 1 ? `0${hour}` : hour;
  //   const m = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  //   return `${year}-${newMounth}-${d}T${h}:${m}`;
  // };

  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={
        validation === "purchase" ? validationSchemaRepair : validationSchema
      }
      onSubmit={(values, formikProps) => {
        console.log(values);
        const {
          brand,
          model,
          numberPhone,
          name,
          status,
          finishTime,
          money,
          description,
        } = values;
        // $D.length === 1 ? "0" + $D : $D;

        const result = {
          brand: brand.brand,
          model,
          status,
          name,
          numberPhone: numberPhone.toString(),
          finishDay: normalDate(finishTime) ? normalDate(finishTime) : null,
          moneyRepair: status === "repair" ? money : 0,
          moneyDiagnosis: status === "diagnosis" ? money : 0,
          moneyPurchase: status === "purchase" ? money : 0,

          description,
        };
        console.log(result);
        dispatch(addTelephones(result));
        // formikProps.resetForm();
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
        onReset,
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
          {/* <TransitionAlerts open={open} setOpen={setOpen} /> */}

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
                onChange={(event, newValue) =>
                  handlerAutocomplate(setFieldValue, "brand", newValue, "model")
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />

              {errors.brand && touched.brand && errors.brand}
            </div>

            {/* <button onClick={toggleModal}>sss</button> */}
            {showModal && (
              <Modal close={toggleModal}>
                <FormModel brand={values.brand} close={toggleModal} />
              </Modal>
            )}

            <div>
              <div style={{ display: "flex" }}>
                <Autocomplete
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  name="model"
                  placeholder="Модель"
                  value={values.model}
                  disabled={values.brand !== null ? false : true}
                  options={values.brand ? values?.brand?.model : []}
                  onChange={(event, newValue) =>
                    setFieldValue("model", newValue)
                  }
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                />
                <IconButton
                  disabled={values.brand !== null ? false : true}
                  onClick={toggleModal}
                  aria-label="delete"
                >
                  <LibraryAddIcon />
                </IconButton>
              </div>

              {errors.model && touched.model && errors.model}
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

            <RadioClick
              changeValidation={setValidation}
              setField={setFieldValue}
            />
            {validation !== "purchase" && (
              <LocalizationProvider
                adapterLocale="uk"
                dateAdapter={AdapterDayjs}
              >
                <MarginItem spacing={2}>
                  <div>
                    <DatePicker
                      value={values.finishDay}
                      onChange={(event) =>
                        handlerAutocomplate(
                          setFieldValue,
                          "finishDay",
                          event,
                          "finishTime"
                        )
                      }
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
