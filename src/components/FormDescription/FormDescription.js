import { Formik } from 'formik';
import validationFormDiscription from '../../validations/formDiscription';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { changePrice } from '../../redux/telephones/phones-operations';
import Input from '@mui/joy/Input';
import { Form, DivInput } from './FormDescription.styled';

import FormLabel from '@mui/joy/FormLabel';
import ButtonClose from '../ButtonClose/ButtonClose';

const initial = {
  description: '',
};

const FormDescription = ({ id, close, status, finishTime }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationFormDiscription}
      onSubmit={({ description }, formikProps) => {
        dispatch(changePrice({ id, other: description, key: 'description' }));
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
            disabled={values.money === '' ? true : false}
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
