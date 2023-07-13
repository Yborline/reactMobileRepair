import { Formik } from "formik";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Label, DivInput, DivButton } from "./FormBrand.styled";
import { validationFormBrandSchema } from "../../../validations/formModule";
import { addBrand } from "../../../services/api";
import Alert from "@mui/material/Alert";
import TransitionAlerts from "../../Alert/AlertSuccess";
import { useEffect, useState } from "react";

const FormBrand = ({ close, changePhone }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open]);

  return (
    <>
      <IconButton
        style={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={close}
        aria-label="delete"
      >
        <CloseIcon style={{ width: "30px", height: "30px" }} />
      </IconButton>
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Бренд та її перша модель додана!"
        top={"-100px"}
      />
      <Formik
        initialValues={{
          brand: "",
          model: "",
        }}
        alidateOnBlur
        validationSchema={validationFormBrandSchema}
        onSubmit={(values, formikProps) => {
          // console.log(values);
          // addModel(brand._id, values);

          addBrand({ ...values, model: [values.model] }).then((data) =>
            data.status
              ? (setOpen(true),
                changePhone((prevState) => [...prevState, data.data]))
              : alert(data)
          );

          // .catch((error) => alert(error.message));
          formikProps.resetForm();
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
            {/* <div> */}
            {/* <Alert severity="success">
              This is a success alert — check it out!
            </Alert> */}

            <Label>
              Введіть назву бренду який хочете добавити на англійській мові
            </Label>
            <DivInput>
              <Input
                type="text"
                placeholder="Brand"
                name="brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
              />
              {errors.brand && touched.brand && errors.brand}
            </DivInput>
            <Label>
              Введіть назву однієї моделі бренду на англійській мові
            </Label>
            <DivInput>
              <Input
                type="text"
                placeholder="Model"
                name="model"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.model}
              />
              {errors.model && touched.model && errors.model}
            </DivInput>

            <DivButton>
              <Button
                disabled={values.model === "" ? true : false}
                style={{ width: "100%" }}
                type="submit"
                variant="contained"
                // onClick={close}
              >
                {values.brand} : {values.model}
              </Button>
            </DivButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormBrand;
