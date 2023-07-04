import { Formik } from "formik";
import validationFormPrice from "../../validations/formPrice";
import Button from "@mui/material/Button";
import { Stack } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import {
  changePrice,
  changeStatus,
  changeStatusStart,
} from "../../redux/telephones/phones-operations";
import CircularProgress from "@mui/joy/CircularProgress";
import { getLoading } from "../../redux/telephones/phones-selector";
import Input from "@mui/joy/Input";
import { Form, DivInput } from "./FormSellPrice.styled";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormLabel from "@mui/joy/FormLabel";

const initial = {
  money: "",
};

const FormSellPrice = ({
  id,
  close,
  status,
  finishTime,
  // price,
  changeOther,
}) => {
  const loading = useSelector(getLoading);
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
      validationSchema={validationFormPrice}
      onSubmit={({ money }, formikProps) => {
        dispatch(
          changeStatus({
            id,
            statusRepair: "finish",
            sellPrice: money,
            status: "purchase",
          })
        );
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
          <IconButton
            style={{ position: "absolute", top: "20px", right: "20px" }}
            onClick={close}
            aria-label="delete"
          >
            <CloseIcon style={{ width: "30px", height: "30px" }} />
          </IconButton>
          <DivInput>
            <FormLabel>Вкажіть ціну роботи!</FormLabel>
            <Input
              type="number"
              name="money"
              // onChange={(event) => setCash(event.target.value)}
              onChange={handleChange}
              value={values.money}
              placeholder="Ціна"
            />
            {errors.money && touched.money && errors.money}
          </DivInput>

          <Button
            disabled={values.money === "" ? true : false}
            type="submit"
            variant="contained"
          >
            Продати телефон за {values.money && `${values.money} грн.`}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSellPrice;
