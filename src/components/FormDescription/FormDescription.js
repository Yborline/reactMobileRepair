import { Formik } from "formik";
import validationFormDiscription from "../../validations/formDiscription";
import Button from "@mui/material/Button";
import { Stack } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { changePrice } from "../../redux/telephones/phones-operations";
import CircularProgress from "@mui/joy/CircularProgress";
import { getLoading } from "../../redux/telephones/phones-selector";
import Input from "@mui/joy/Input";
import { Form, DivInput } from "./FormDescription.styled";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormLabel from "@mui/joy/FormLabel";
import ButtonClose from "../ButtonClose/ButtonClose";

const initial = {
  description: "",
};

const FormDescription = ({ id, close, status, finishTime }) => {
  const dispatch = useDispatch();

  //   const repairClick = () => {
  //     finishTime === null
  //       ? toggleModal()
  //       : dispatch(changeStatus({ id: id, status: "repair" }));
  //   };
  console.log(status);
  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationFormDiscription}
      onSubmit={({ description }, formikProps) => {
        console.log(description);
        dispatch(changePrice({ id, other: description, key: "description" }));
        close();
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

          {/* <button onClick={toggleModal}>sss</button> */}
          <ButtonClose close={close} />
          <DivInput>
            <FormLabel>Ваші нотатки!</FormLabel>
            <Input
              type="string"
              name="description"
              onChange={handleChange}
              value={values.description}
              placeholder="Опис"
            />
            {errors.description && touched.description && errors.description}
          </DivInput>

          <Button
            disabled={values.money === "" ? true : false}
            type="submit"
            variant="contained"
          >
            Змінити опис
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormDescription;
