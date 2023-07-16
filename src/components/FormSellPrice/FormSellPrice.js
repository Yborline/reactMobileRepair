import { Formik } from 'formik';
import validationFormPrice from '../../validations/formPrice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {
  changeStatus,
  changeStatusStart,
} from '../../redux/telephones/phones-operations';
import Input from '@mui/joy/Input';
import { Form, DivInput } from './FormSellPrice.styled';
import FormLabel from '@mui/joy/FormLabel';
import ButtonClose from '../ButtonClose/ButtonClose';

const initial = {
  money: '',
};

const FormSellPrice = ({ id, close, status }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationFormPrice}
      onSubmit={({ money }, formikProps) => {
        status === 'purchase'
          ? dispatch(
              changeStatusStart({
                id,
                sellPrice: money,
                statusRepair: 'finish',
              }),
            )
          : dispatch(
              changeStatus({
                id,
                status: 'purchase',
                sellPrice: money,
                statusRepair: 'finish',
              }),
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
      }) => (
        <Form
          id="form"
          encType="multipart/form-data"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ButtonClose close={close} />
          <DivInput>
            <FormLabel>Вкажіть ціну роботи!</FormLabel>
            <Input
              type="number"
              name="money"
              onChange={handleChange}
              value={values.money}
              placeholder="Ціна"
            />
            {errors.money && touched.money && errors.money}
          </DivInput>

          <Button
            disabled={values.money === '' ? true : false}
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
