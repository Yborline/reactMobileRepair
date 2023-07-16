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

const ItemPurchase = ({ phone, textStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalPrice, setShowModalPrice] = useState(false);
  const [showModalSell, setShowModalSell] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalPrice = () => {
    setShowModalPrice(!showModalPrice);
  };

  const toggleModalSell = () => {
    setShowModalSell(!showModalSell);
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
                onClick={toggleModal}
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

      {showModal && (
        <Modal close={toggleModal}>
          <FormDate
            id={_id}
            toggleModal={toggleModal}
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
      {showModalSell && (
        <Modal close={toggleModalSell}>
          <FormSellPrice id={_id} status={status} close={toggleModalSell} />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemPurchase;
