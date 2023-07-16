import { Formik } from 'formik';
import { validationDateSchema } from '../../validations/formDatePicker';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form } from './FormDate.styled';
import 'dayjs/locale/uk';
import dayjs from 'dayjs';
import { normalDate } from '../../helpers/normalDate';
import { useDispatch } from 'react-redux';
import {
  changeStatus,
  changeTime,
} from '../../redux/telephones/phones-operations';
import ButtonClose from '../ButtonClose/ButtonClose';

const initial = {
  finishDay: null,
  finishTime: null,
};

const FormDate = ({ id, toggleModal, time, status, finishTime }) => {
  const dispatch = useDispatch();

  const handlerAutocomplate = (setFieldValue, text, data, other) => {
    setFieldValue(text, data);
    setFieldValue(other, null);
  };

  return (
    <Formik
      initialValues={initial}
      alidateOnBlur
      validationSchema={validationDateSchema}
      onSubmit={(values, formikProps) => {
        const { finishTime } = values;

        const result = {
          finishDay: normalDate(finishTime),
        };

        time
          ? dispatch(changeTime({ id, result }))
          : dispatch(
              changeStatus({
                id: id,
                status: 'repair',
                finishDay: normalDate(finishTime),
                statusRepair: 'start',
              }),
            );
        toggleModal();
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
          <ButtonClose close={toggleModal} />
          <Stack spacing={2}>
            <LocalizationProvider adapterLocale="uk" dateAdapter={AdapterDayjs}>
              <Stack spacing={2}>
                <div>
                  <DatePicker
                    value={values.finishDay}
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
                  {errors.finishDay && touched.finishDay && errors.finishDay}
                </div>
                <div>
                  <TimePicker
                    disabled={values.finishDay !== null ? false : true}
                    minutesStep={10}
                    ampm={false}
                    label="Час закінчення робіт"
                    value={values.finishDay}
                    sx={{ width: '100%' }}
                    onChange={(event, newValue) =>
                      setFieldValue('finishTime', event)
                    }
                  />
                  {errors.finishTime && touched.finishTime && errors.finishTime}
                </div>
              </Stack>
            </LocalizationProvider>

            <Button type="submit" variant="contained">
              {time ? `Змінити дату` : `На ремонт !`}
            </Button>
          </Stack>

          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default FormDate;
