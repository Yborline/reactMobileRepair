import { Formik } from "formik";
import { validationDateSchema } from "../../validations/formDatePicker";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Form, Container, Div } from "./FormDate.styled";
import "dayjs/locale/uk";
import dayjs from "dayjs";
import { normalDate } from "../../helpers/normalDate";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  changeTime,
} from "../../redux/telephones/phones-operations";
import CircularProgress from "@mui/joy/CircularProgress";
import { getLoading } from "../../redux/telephones/phones-selector";

const initial = {
  finishDay: null,
  finishTime: null,
};

const FormDate = ({ id, toggleModal, time, status, finishTime }) => {
  const loading = useSelector(getLoading);
  console.log(loading);
  console.log(status);
  const dispatch = useDispatch();
  const arrayTime = finishTime?.split("T");
  const normalTime = arrayTime?.join(" ");

  const handlerAutocomplate = (setFieldValue, text, data, other) => {
    setFieldValue(text, data);
    setFieldValue(other, null);
  };

  return (
    <Container>
      <Formik
        initialValues={initial}
        alidateOnBlur
        validationSchema={validationDateSchema}
        onSubmit={(values, formikProps) => {
          // console.log(values);
          const { finishTime } = values;

          const result = {
            finishDay: normalDate(finishTime),
          };
          console.log(result);
          time
            ? dispatch(changeTime({ id, result }))
            : dispatch(
                changeStatus({
                  id: id,
                  status: "repair",
                  finishDay: normalDate(finishTime),
                  statusRepair: "start",
                })
              );
          toggleModal();
          // status !== "purchase" && toggleModal();
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
            <Stack spacing={2}>
              {/* <button onClick={toggleModal}>sss</button> */}

              <LocalizationProvider
                adapterLocale="uk"
                dateAdapter={AdapterDayjs}
              >
                <Stack spacing={2}>
                  <Div>
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
                  </Div>
                  <Div>
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
                  </Div>
                </Stack>
              </LocalizationProvider>

              <Button type="submit" variant="contained">
                {time ? `Змінити дату` : `На ремонт !`}
              </Button>
              {/* <Radio name="action" options={listJenisKelamin} /> */}
              {/* <Field component={RadioGroup} name="action"> */}
              {/* <RadioPositionEnd handleChange={setFieldValue} /> */}
              {/* </Field> */}
            </Stack>

            {/* </div> */}
          </Form>
        )}
      </Formik>
      {/* {finishTime && (
        <Button
          style={{ width: "100%" }}
          onClick={repairClick}
          disabled={finishTime === null && loading === false ? true : false}
          type="submit"
          variant="contained"
        >
          {loading ? (
            <CircularProgress variant="plain" size="sm" />
          ) : (
            `На ремонт до ${normalTime}`
          )}
        </Button>
      )} */}
    </Container>
  );
};

export default FormDate;
