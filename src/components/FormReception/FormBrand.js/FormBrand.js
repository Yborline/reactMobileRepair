import { Formik } from 'formik';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import { Form, Label, DivInput, DivButton } from './FormBrand.styled';
import { validationFormBrandSchema } from '../../../validations/formModule';
import { addBrand } from '../../../services/api';
import TransitionAlerts from '../../Alert/AlertSuccess';
import { useEffect, useState } from 'react';
import ButtonClose from '../../ButtonClose/ButtonClose';

const FormBrand = ({ close, changePhone }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [open]);

  return (
    <>
      <ButtonClose close={close} />
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Бренд та її перша модель додана!"
        top={'-100px'}
      />
      <Formik
        initialValues={{
          brand: '',
          model: '',
        }}
        alidateOnBlur
        validationSchema={validationFormBrandSchema}
        onSubmit={(values, formikProps) => {
          addBrand({
            brand: values.brand.toLocaleLowerCase().trim(),
            model: [values.model.trim()],
          }).then(data =>
            data.status
              ? (setOpen(true),
                changePhone(prevState => [...prevState, data.data]))
              : alert('Така модель вже є'),
          );

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
        }) => (
          <Form
            id="form"
            encType="multipart/form-data"
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                disabled={values.model === '' ? true : false}
                style={{ width: '100%' }}
                type="submit"
                variant="contained"
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
