import ButtonClose from '../ButtonClose/ButtonClose';
import TransitionAlerts from '../../components/Alert/AlertSuccess';
import { useHookAlert } from '../../hooks/useHookAlert';
import { Formik } from 'formik';
import { List } from './StorageForm.styled';
import Checkbox from '@mui/joy/Checkbox';

import Typography from '@mui/joy/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSparePartsStorage,
  updateSparePartsStorage,
} from '../../redux/storage/storage-operations';
import { getStorage } from '../../redux/storage/storage-selector';
import { useEffect, useState } from 'react';
import { getOnePhoneStorage } from '../../services/api';

const StorageForm = ({ id, brand, model, close, setOpen, scrollTop }) => {
  const [telephone, setTelephone] = useState(null);

  const dispatch = useDispatch();
  // const storage = useSelector(getStorage);

  useEffect(() => {
    getOnePhoneStorage(model).then(data => setTelephone(data.phone));
  }, [model]);
  console.log(telephone);
  const handleClick = (e, setFieldValue) => {
    setFieldValue(e.target.value, e.target.checked ? 1 : 0);
  };

  return (
    <>
      <ButtonClose close={close} />

      <Formik
        initialValues={{
          boardToBoardPlume: 0,
          mainBoard: 0,
          subBoard: 0,
          antenna: 0,
          displayFrame: 0,
          lid: 0,
          buttonPlume: 0,
          frontCamera: 0,
          mainCamera: 0,
          screen: 0,
        }}
        validateOnBlur
        // validationSchema={validationFormModelSchema}
        onSubmit={(values, formikProps) => {
          const newObject = {
            brand,
            model,
            spareParts: values,
          };

          if (telephone) {
            dispatch(
              updateSparePartsStorage({ id: telephone._id, value: newObject }),
            );
          } else {
            dispatch(addSparePartsStorage(newObject));
          }
          close();
          setOpen(true);
          scrollTop();
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
          <form
            id="form"
            encType="multipart/form-data"
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label>Введіть назву моделі на англійській мові</label>

            <Typography
              id="sandwich-group"
              level="body-sm"
              fontWeight="lg"
              mb={1}
            >
              Sandwich Dressings
            </Typography>
            <List>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="boardToBoardPlume"
                  label="Міжплатний шлейф"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="mainBoard"
                  label="Основна плата"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="subBoard"
                  label="Суб плата"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="antenna"
                  label="Антена"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="displayFrame"
                  label="Рама дісплея"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="lid"
                  label="Кришка"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="buttonPlume"
                  label="Шлейф кнопок"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="frontCamera"
                  label="Фронтальна камера
"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="mainCamera"
                  label="Основна камера"
                />
              </li>
              <li>
                <Checkbox
                  onClick={e => handleClick(e, setFieldValue)}
                  value="screen"
                  label="экран"
                />
              </li>
            </List>
            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default StorageForm;
