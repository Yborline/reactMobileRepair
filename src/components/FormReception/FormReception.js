import { useEffect, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import RadioClick from './RadioClick';
import {
  Form,
  MarginItem,
  StyledTextarea,
  SpanError,
} from './FormReception.styled';
import 'dayjs/locale/uk';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {
  validationDiagnosisSchema,
  validationSchemaRepair,
  validationRepairSchema,
} from '../../validations/formReception';
import { getAllbrand } from '../../services/api';
import Modal from '../Modal/Modal';
import FormModel from './FormModel/FormModel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addTelephones } from '../../redux/telephones/phones-operations';
import TransitionAlerts from '../Alert/AlertSuccess';
import { normalDate } from '../../helpers/normalDate';
import { getLoading } from '../../redux/telephones/phones-selector';
import LoadingButton from '@mui/lab/LoadingButton';
import FormBrand from './FormBrand.js/FormBrand';
import { useHookAlert } from '../../hooks/useHookAlert';

const initial = {
  brand: null,
  model: null,
  numberPhone: '',
  name: '',
  status: 'diagnosis',
  finishDay: null,
  finishTime: null,
  money: '',
  description: '',
  repairPrice: '',
};

const FormReception = ({ scroll }) => {
  const [showModalBrand, setShowModalBrand] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [telephones, setTelephones] = useState([]);
  const [validation, setValidation] = useState('normal');
  const { open, setOpen } = useHookAlert();
  const loading = useSelector(getLoading);

  const dispatch = useDispatch();

  const toggleModalBrand = () => {
    setShowModalBrand(!showModalBrand);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getAllbrand().then(data => setTelephones(data.allBrand));
  }, []);

  const handlerAutocomplate = (setFieldValue, text, data, other) => {
    setFieldValue(text, data);
    setFieldValue(other, null);
  };

  const choiceValidation = value => {
    switch (value) {
      case 'purchase':
        return validationSchemaRepair;
      case 'diagnosis':
        return validationDiagnosisSchema;
      case 'repair':
        return validationRepairSchema;
      default:
        return validationDiagnosisSchema;
    }
  };

  const handleUpButton = () => {
    window.scrollBy(0, 0);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Телефон додано!"
        top={'-13px'}
      />
      <Formik
        initialValues={initial}
        alidateOnBlur
        validationSchema={choiceValidation(validation)}
        onSubmit={(values, formikProps) => {
          const {
            brand,
            model,
            numberPhone,
            name,
            status,
            finishTime,
            money,
            description,
            repairPrice = 0,
          } = values;

          const result = {
            brand: brand.brand,
            model,
            status,
            name,
            numberPhone:
              numberPhone.length === 0 ? null : numberPhone.toString(),
            finishDay: normalDate(finishTime) ? normalDate(finishTime) : null,
            moneyRepair: status === 'repair' ? money : 0,
            moneyDiagnosis: status === 'diagnosis' ? money : 0,
            moneyPurchase: status === 'purchase' ? money : 0,
            repairPrice: status === 'repair' ? repairPrice : 0,
            sellPrice: 0,
            description,
          };

          dispatch(addTelephones(result));
          setOpen(true);
          scroll();
          formikProps.resetForm();
          formikProps.setFieldValue('status', status);
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
            <MarginItem spacing={2}>
              <div>
                <RadioClick
                  changeValidation={setValidation}
                  setField={setFieldValue}
                />
                <SpanError>
                  {errors.status && touched.status && errors.status}
                </SpanError>
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <Autocomplete
                    style={{
                      height: '40px',
                      width: '100%',
                    }}
                    type="text"
                    name="brand"
                    placeholder="Бренд"
                    value={values.brand}
                    options={telephones}
                    onBlur={handleBlur}
                    getOptionLabel={option => option.brand}
                    sx={{ height: '44px' }}
                    onChange={(event, newValue) =>
                      handlerAutocomplate(
                        setFieldValue,
                        'brand',
                        newValue,
                        'model',
                      )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                  <IconButton onClick={toggleModalBrand} aria-label="delete">
                    <LibraryAddIcon />
                  </IconButton>
                </div>
                <SpanError>
                  {errors.brand && touched.brand && errors.brand}
                </SpanError>
              </div>

              <div>
                <div style={{ display: 'flex' }}>
                  <Autocomplete
                    style={{
                      height: '40px',
                      width: '100%',
                    }}
                    type="text"
                    name="model"
                    placeholder="Модель"
                    value={values.model}
                    disabled={values.brand !== null ? false : true}
                    options={values.brand ? values?.brand?.model : []}
                    onChange={(event, newValue) =>
                      setFieldValue('model', newValue)
                    }
                    getOptionLabel={option => option}
                    isOptionEqualToValue={(option, value) => option === value}
                  />
                  <IconButton
                    disabled={values.brand !== null ? false : true}
                    onClick={toggleModal}
                    aria-label="delete"
                  >
                    <LibraryAddIcon />
                  </IconButton>
                </div>
                <SpanError>
                  {errors.model && touched.model && errors.model}
                </SpanError>
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Ім'я клієнта "
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  sx={{ height: '40px' }}
                />
                <SpanError>
                  {errors.name && touched.name && errors.name}
                </SpanError>
              </div>
              <div>
                <Input
                  type="number"
                  name="numberPhone"
                  onChange={handleChange}
                  value={values.numberPhone}
                  placeholder="Номер телефону"
                  sx={{ height: '44px' }}
                />
                <SpanError>
                  {errors.numberPhone &&
                    touched.numberPhone &&
                    errors.numberPhone}
                </SpanError>
              </div>
              {validation !== 'purchase' && (
                <LocalizationProvider
                  adapterLocale="uk"
                  dateAdapter={AdapterDayjs}
                >
                  <MarginItem spacing={2}>
                    <div>
                      <DatePicker
                        value={values.finishDay}
                        slotProps={{ textField: { size: 'small' } }}
                        onChange={event =>
                          handlerAutocomplate(
                            setFieldValue,
                            'finishDay',
                            event,
                            'finishTime',
                          )
                        }
                        minDate={dayjs()}
                        label="Дата закінчення робіт"
                        sx={{ width: '100%' }}
                      />
                      <SpanError>
                        {errors.finishDay &&
                          touched.finishDay &&
                          errors.finishDay}
                      </SpanError>
                    </div>
                    <div>
                      <TimePicker
                        disabled={values.finishDay !== null ? false : true}
                        minutesStep={5}
                        slotProps={{ textField: { size: 'small' } }}
                        label="Час закінчення робіт"
                        value={values.finishDay}
                        sx={{ width: '100%' }}
                        onChange={(event, newValue) =>
                          setFieldValue('finishTime', event)
                        }
                      />
                      <SpanError>
                        {errors.finishTime &&
                          touched.finishTime &&
                          errors.finishTime}
                      </SpanError>
                    </div>
                  </MarginItem>
                </LocalizationProvider>
              )}
              {validation === 'repair' && (
                <div>
                  <Input
                    type="number"
                    name="repairPrice"
                    onChange={handleChange}
                    value={values.repairPrice}
                    placeholder="Ціна запчастин"
                    sx={{ height: '40px' }}
                  />
                  <SpanError>
                    {errors.repairPrice &&
                      touched.repairPrice &&
                      errors.repairPrice}
                  </SpanError>
                </div>
              )}
              <div>
                <Input
                  type="number"
                  name="money"
                  onChange={handleChange}
                  value={values.money}
                  placeholder="Ціна"
                  sx={{ height: '40px' }}
                />
                <SpanError>
                  {errors.money && touched.money && errors.money}
                </SpanError>
              </div>
              <div>
                <StyledTextarea
                  onChange={handleChange}
                  placeholder="Опис роботи"
                  value={values.description}
                  name="description"
                />
                <SpanError>
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </SpanError>
              </div>
              <LoadingButton
                variant="contained"
                color="success"
                loading={loading}
                onClick={handleSubmit}
              >
                <span>Додати</span>
              </LoadingButton>
            </MarginItem>

            {showModal && (
              <Modal close={toggleModal}>
                <FormModel
                  setFieldValue={setFieldValue}
                  сlearBrand={handlerAutocomplate}
                  changePhone={setTelephones}
                  brand={values.brand}
                  close={toggleModal}
                />
              </Modal>
            )}
            {showModalBrand && (
              <Modal close={toggleModalBrand}>
                <FormBrand
                  changePhone={setTelephones}
                  close={toggleModalBrand}
                />
              </Modal>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormReception;
