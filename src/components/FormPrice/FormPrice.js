import { Formik } from "formik";
import validationFormPrice from "../../validations/formPrice";
import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";
import { Form, DivInput } from "./FormPrice.styled";

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
