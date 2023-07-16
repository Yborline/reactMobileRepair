import {
  LiCard,
  DivInfo,
  DivStatus,
  DivTime,
  TitleCard,
  DivButton,
  LinkPhone,
} from './ItemRepairFinish.styled';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '../../Modal/Modal';
import FormDate from '../../FormDate/FormDate';
import FormSellPrice from '../../FormSellPrice/FormSellPrice';
import BuildIcon from '@mui/icons-material/Build';
import PaidIcon from '@mui/icons-material/Paid';

const ItemRepairFinish = ({ item, textStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalSell, setShowModalSell] = useState(false);

  const {
    model,
    brand,
    statusRepair,
    description,
    finishDay,
    name,
    numberPhone,
    moneyRepair,
    moneyDiagnosis,

    status,
    repairPrice,
    _id,
  } = item;

  const headerString = `${brand.toUpperCase()} ${model}`;

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModalSell = () => {
    setShowModalSell(!showModalSell);
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
          <div></div>
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
              <PaidIcon color="action" />

              <p>{repairPrice} грн.</p>
              <BuildIcon color="action" />
            </>
          ) : (
            <>
              {' '}
              <p>{moneyDiagnosis} грн.</p>
            </>
          )}
        </DivInfo>
        <DivTime>
          <DivInfo>
            <p> {finishDay}</p>
          </DivInfo>
        </DivTime>
      </div>

      {status === 'diagnosis' ? (
        <DivButton>
          <Button
            onClick={toggleModal}
            style={{ width: '100%' }}
            variant="contained"
            color="success"
          >
            На ремонт
          </Button>
        </DivButton>
      ) : (
        <Button
          onClick={toggleModalSell}
          style={{ width: '100%' }}
          variant="contained"
          color="success"
        >
          Продажа
        </Button>
      )}
      {showModal && (
        <Modal close={toggleModal}>
          <FormDate
            id={_id}
            toggleModal={toggleModal}
            status={status}
            time={false}
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

export default ItemRepairFinish;
