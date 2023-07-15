import { Formik } from "formik";
import validationFormPrice from "../../validations/formPrice";
import Button from "@mui/material/Button";
import { Stack } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { changePrice } from "../../redux/telephones/phones-operations";
import CircularProgress from "@mui/joy/CircularProgress";
import { getLoading } from "../../redux/telephones/phones-selector";
import Input from "@mui/joy/Input";
import { Form, DivInput } from "./FormPrice.styled";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormLabel from "@mui/joy/FormLabel";
import ButtonClose from "../ButtonClose/ButtonClose";

const initial = {
  money: "",
};

const FormPrice = ({ id, close, status, finishTime, price, submit }) => {
  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationFormPrice}
      onSubmit={({ money }, formikProps) => {
        submit(money);
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
      }) => (
        <Form
          id="form"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ButtonClose close={close} />
          <DivInput>
            <labe>Вкажіть ціну роботи!</labe>
            <Input
              type="number"
              name="money"
              // onChange={(event) => setCash(event.target.value)}
              onChange={handleChange}
              value={values.money}
              placeholder={`${price}`}
            />
            {errors.money && touched.money && errors.money}
          </DivInput>

          <Button
            disabled={values.money === "" ? true : false}
            type="submit"
            variant="contained"
          >
            Зміна оплати за послугу
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormPrice;
