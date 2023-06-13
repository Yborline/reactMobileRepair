import { Formik } from "formik";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Label, DivInput, DivButton } from "./FormModel.styled";
import validationFormModelSchema from "../../../validations/formModule";
import { addModel } from "../../../services/api";
import Alert from "@mui/material/Alert";
import TransitionAlerts from "../../Alert/AlertSuccess";
import { useEffect, useState } from "react";

const FormModel = ({ brand = "", close }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open]);

  return (
    <>
      <TransitionAlerts open={open} setOpen={setOpen} text="Модель добавлена" />
      <Formik
        initialValues={{
          model: "",
        }}
        alidateOnBlur
        validationSchema={validationFormModelSchema}
        onSubmit={(values, formikProps) => {
          // console.log(values);
          console.log(brand._id);
          console.log(values);
          // addModel(brand._id, values);
          addModel(brand._id, values).then((data) =>
            data.status ? setOpen(true) : alert(data)
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
            <IconButton
              style={{ position: "absolute", top: "20px", right: "20px" }}
              onClick={close}
              aria-label="delete"
            >
              <CloseIcon style={{ width: "30px", height: "30px" }} />
            </IconButton>
            <Label>Введіть назву моделі на англійській мові</Label>
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
                {brand.brand} : {values.model}
              </Button>
            </DivButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormModel;
