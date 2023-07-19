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
import { useToggleFormDate } from '../../../hooks/useToggleFormDate';
import { useToggleModalSell } from '../../../hooks/useToggleModalSell';

const ItemRepairFinish = ({ item, textStatus }) => {
  const { isOpenModalSell, toggleModalSell } = useToggleModalSell();
  const { isOpenDate, toggleDate } = useToggleFormDate();
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
            onClick={toggleDate}
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
      {isOpenDate && (
        <Modal close={toggleDate}>
          <FormDate
            id={_id}
            toggleModal={toggleDate}
            status={status}
            time={false}
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

export default ItemRepairFinish;
