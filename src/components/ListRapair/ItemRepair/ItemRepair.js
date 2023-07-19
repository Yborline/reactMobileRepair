import hook from '../../../hooks/useHookTimer';
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import BuildIcon from '@mui/icons-material/Build';
import PaidIcon from '@mui/icons-material/Paid';
import {
  LiCard,
  DivInfo,
  DivStatus,
  DivTime,
  TitleCard,
  DivButton,
  LinkPhone,
} from './ItemRepair.styled';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import FormDate from '../../FormDate/FormDate';
import { useDispatch } from 'react-redux';
import {
  changePrice,
  changeStatusStart,
} from '../../../redux/telephones/phones-operations';
import FormPrice from '../../FormPrice/FormPrice';
import FormDescription from '../../FormDescription/FormDescription';
import choiceMoney from '../../../helpers/choiceMoney';
import { useTogglePrice } from '../../../hooks/useTogglePrice';
import { useToggleFormDate } from '../../../hooks/useToggleFormDate';

const ItemRepair = ({ item, textStatus }) => {
  const [showTime, setShowTime] = useState(false);
  const { isOpenDate, open, close, toggleDate } = useToggleFormDate();
  const { isOpenCosts, isOpenMoney, toggleMoney, toggleCoasts } =
    useTogglePrice();
  const [showModalDescription, setShowModalDescription] = useState(false);

  const dispatch = useDispatch();
  const {
    model,
    brand,
    statusRepair,
    status,
    description,
    finishDay,
    name,
    numberPhone,
    moneyDiagnosis,
    moneyRepair,
    _id,
    repairPrice,
  } = item;
  const arrayTime = finishDay?.split('T');
  const normalTime = arrayTime?.join(' ');
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime] = hook.useFinaltimer(finishDay, '');

  const toggleModalDescription = () => {
    setShowModalDescription(!showModalDescription);
  };

  const submitPrice = money => {
    if (isOpenCosts) {
      dispatch(changePrice({ id: _id, other: money, key: 'repairPrice' }));
    } else {
      dispatch(
        changePrice({ id: _id, other: money, key: choiceMoney(status) }),
      );
    }
    toggleMoney();
  };
  return (
    <LiCard style={{ position: 'relative' }}>
      <div>
        <TitleCard>{headerString}</TitleCard>
        <DivStatus status={statusRepair}>
          <p>{textStatus}</p>
        </DivStatus>

        <DivInfo>
          <p>{description}</p>
          <div>
            <IconButton
              onClick={toggleModalDescription}
              aria-label="change description"
            >
              <EditIcon />
            </IconButton>
          </div>
        </DivInfo>

        <DivInfo>
          <p>{name}</p>
        </DivInfo>
        <DivInfo>
          {numberPhone ? (
            <LinkPhone href={`tel:+${numberPhone}`}>{numberPhone}</LinkPhone>
          ) : (
            <p>Номер не вказано!</p>
          )}
        </DivInfo>
        <DivInfo>
          {status === 'repair' ? (
            <>
              <p>{moneyRepair} грн.</p>
              <IconButton onClick={toggleMoney} aria-label="change price">
                <PaidIcon />
              </IconButton>
              <p>{repairPrice} грн.</p>
              <IconButton onClick={toggleCoasts} aria-label="change price">
                <BuildIcon />
              </IconButton>
            </>
          ) : (
            <>
              {' '}
              <p>{moneyDiagnosis} грн.</p>
              <IconButton onClick={toggleMoney} aria-label="change price">
                <EditIcon />
              </IconButton>
            </>
          )}
        </DivInfo>
        <DivTime>
          <DivInfo>
            <Button
              onClick={() => setShowTime(!showTime)}
              color="error"
              size="normal"
            >
              {normalTime}
            </Button>

            <IconButton onClick={toggleDate} aria-label="change">
              <EditIcon />
            </IconButton>
          </DivInfo>
          {showTime &&
            (finalTime === false ? (
              <p>время закончилось</p>
            ) : (
              <p>{finalTime}</p>
            ))}
        </DivTime>
      </div>
      <DivButton>
        <Button
          onClick={() =>
            dispatch(changeStatusStart({ id: _id, statusRepair: 'finish' }))
          }
          style={{ width: '100%', marginLeft: '10px' }}
          variant="contained"
          color="success"
        >
          Виконано
        </Button>
      </DivButton>
      {isOpenDate && (
        <Modal close={toggleDate}>
          <FormDate
            id={_id}
            time={true}
            toggleModal={toggleDate}
            status={status}
          />
        </Modal>
      )}
      {(isOpenCosts || isOpenMoney) && (
        <Modal close={isOpenMoney ? toggleMoney : toggleCoasts}>
          <FormPrice
            price={
              status === 'repair'
                ? isOpenCosts
                  ? repairPrice
                  : moneyRepair
                : moneyDiagnosis
            }
            id={_id}
            status={status}
            close={isOpenMoney ? toggleMoney : toggleCoasts}
            submit={submitPrice}
          />
        </Modal>
      )}
      {showModalDescription && (
        <Modal close={toggleModalDescription}>
          <FormDescription
            id={_id}
            status={status}
            close={toggleModalDescription}
          />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemRepair;
