import { Formik } from 'formik';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import { Form, Label, DivInput, DivButton } from './FormModel.styled';
import { validationFormModelSchema } from '../../../validations/formModule';
import { addModel } from '../../../services/api';
import TransitionAlerts from '../../Alert/AlertSuccess';
import { useEffect, useState } from 'react';
import ButtonClose from '../../ButtonClose/ButtonClose';
import { useHookAlert } from '../../../hooks/useHookAlert';

const FormModel = ({
  сlearBrand,
  setFieldValue,
  changePhone,
  brand = '',
  close,
}) => {
  const { open, setOpen } = useHookAlert();

  const newArrayPhones = data => {
    changePhone(prevState => [
      ...prevState.map(item => {
        const newArray =
          item._id === data.updateModel._id
            ? { ...item, model: data.updateModel.model }
            : item;
        setFieldValue('brand', newArray);
        return newArray;
      }),
    ]);
  };
  return (
    <>
      <ButtonClose close={close} />
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Модель добавлена"
        top={'-100px'}
      />
      <Formik
        initialValues={{
          model: '',
        }}
        alidateOnBlur
        validationSchema={validationFormModelSchema}
        onSubmit={(values, formikProps) => {
          addModel(brand._id, { model: values.model.trim() }).then(data =>
            data.status ? (setOpen(true), newArrayPhones(data)) : alert(data),
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
                disabled={values.model === '' ? true : false}
                style={{ width: '100%' }}
                type="submit"
                variant="contained"
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
