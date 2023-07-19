import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {
  LiCard,
  DivInfo,
  DivStatus,
  TitleCard,
  DivButton,
} from './ItemPurchase.styled';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePrice } from '../../../redux/telephones/phones-operations';
import FormDate from '../../FormDate/FormDate';
import Modal from '../../Modal/Modal';
import FormPrice from '../../FormPrice/FormPrice';
import FormSellPrice from '../../FormSellPrice/FormSellPrice';
import FinishResult from './FinishResult';
import { Stack } from '@mui/material';
import choiceMoney from '../../../helpers/choiceMoney';
import { useToggleFormDate } from '../../../hooks/useToggleFormDate';
import { useToggleModalSell } from '../../../hooks/useToggleModalSell';

const ItemPurchase = ({ phone, textStatus }) => {
  const { isOpenDate, toggleDate } = useToggleFormDate();
  const [showModalPrice, setShowModalPrice] = useState(false);

  const { isOpenModalSell, toggleModalSell } = useToggleModalSell();
  const dispatch = useDispatch();
  const {
    brand,
    description,
    model,
    _id,
    moneyDiagnosis,
    moneyPurchase,
    moneyRepair,
    finishDay,
    status,
    statusRepair,
    sellPrice,
    repairPrice,
  } = phone;

  const toggleModalPrice = () => {
    setShowModalPrice(!showModalPrice);
  };

  const submitPrice = money => {
    dispatch(changePrice({ id: _id, other: money, key: choiceMoney(status) }));

    toggleModalPrice();
  };

  const headerString = `${brand.toUpperCase()} ${model}`;

  return (
    <LiCard style={{ position: 'relative' }}>
      <div>
        <TitleCard>{headerString}</TitleCard>
        <DivStatus status={statusRepair}>
          <p>{textStatus}</p>
        </DivStatus>

        <DivInfo>
          <p>{description}</p>
          <div></div>
        </DivInfo>

        <DivInfo>
          <p>{status === 'purchase' && moneyPurchase} грн.</p>
          {statusRepair !== 'finish' && (
            <IconButton onClick={toggleModalPrice} aria-label="change price">
              <EditIcon />
            </IconButton>
          )}
        </DivInfo>
        <DivInfo>
          <p>{finishDay}</p>
        </DivInfo>
      </div>

      {statusRepair === 'finish' ? (
        <FinishResult
          moneyRepair={moneyRepair}
          moneyDiagnosis={moneyDiagnosis}
          moneyPurchase={moneyPurchase}
          sellPrice={sellPrice}
          repairPrice={repairPrice}
        />
      ) : (
        <div>
          <Stack spacing={2}>
            <DivButton>
              <Button
                onClick={toggleDate}
                style={{ width: '100%' }}
                variant="contained"
                color="warning"
              >
                На ремонт
              </Button>
              <Button
                style={{ width: '100%', marginLeft: '10px' }}
                variant="contained"
                color="info"
              >
                На запчастини
              </Button>
            </DivButton>
            <Button
              onClick={toggleModalSell}
              style={{ width: '100%' }}
              variant="contained"
              color="success"
            >
              Продажа
            </Button>
          </Stack>
        </div>
      )}

      {isOpenDate && (
        <Modal close={toggleDate}>
          <FormDate
            id={_id}
            toggleModal={toggleDate}
            status={status}
            finishTime={finishDay}
            time={false}
          />
        </Modal>
      )}
      {showModalPrice && (
        <Modal close={toggleModalPrice}>
          <FormPrice
            price={moneyPurchase}
            id={_id}
            status={status}
            close={toggleModalPrice}
            submit={submitPrice}
          />
        </Modal>
      )}
      {isOpenModalSell && (
        <Modal close={toggleModalSell}>
          <FormSellPrice id={_id} status={status} close={toggleModalSell} />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemPurchase;
