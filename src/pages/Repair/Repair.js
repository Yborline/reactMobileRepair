import { useSelector } from 'react-redux';
import { useState } from 'react';
import ListRepair from '../../components/ListRapair/ListRepair';
import {
  filterPhones,
  findFinishPhonesDate,
  getTypesPhone,
} from '../../redux/telephones/phones-selector';
import { Container, BtnContainer, ContainerFilter } from './Repair.styled';

import ListRepairFinish from '../../components/ListRapair/ListRepairFinish/ListRepairFinish';
import EmptyText from '../../components/EmptyText/EmptyText';
import Filter from '../../components/Filter/Filter';
import { useWindowSize } from '@react-hook/window-size';
import FilterDate from '../../components/FilterDate/FilterDate';
import Profit from '../../components/Profit/Profit';
import { BttnSuccess } from '../../components/BttnSuccess/BttnSuccess';

const Repair = () => {
  const { repairs, diagnosis } = useSelector(getTypesPhone);
  const [showRepair, setShowRepair] = useState(false);
  const [width] = useWindowSize();

  const [showFinishRepair, setShowFinishRepair] = useState(false);
  const { filteredRepairs } = useSelector(filterPhones);
  const { dateFilterRepairs } = useSelector(findFinishPhonesDate);
  const handleClickFinishRepair = () => {
    if (showRepair) {
      setShowFinishRepair(!showFinishRepair);
      setShowRepair(!showRepair);
    }
    setShowFinishRepair(!showFinishRepair);
  };

  const handleClickRepair = () => {
    if (showFinishRepair) {
      setShowFinishRepair(!showFinishRepair);
      setShowRepair(!showRepair);
    }
    setShowRepair(!showRepair);
  };

  return (
    <Container>
      <BtnContainer spacing={2}>
        <BttnSuccess handleClick={handleClickRepair}>Ремонт</BttnSuccess>
        <BttnSuccess handleClick={handleClickFinishRepair}>
          Виконаний ремонт
        </BttnSuccess>
      </BtnContainer>
      {showFinishRepair && (
        <ContainerFilter>
          <Filter
            marginBottom={width < 768 ? '15px' : '0px'}
            width={width > 768 ? '240px' : '100%'}
            marginRight={width > 768 ? '20px' : '0px'}
          />
          <FilterDate />
        </ContainerFilter>
      )}
      {showRepair &&
        (repairs.start.length === 0 ? (
          <EmptyText text={'Телефонів на ремонті не має'} />
        ) : (
          <ListRepair textStatus="В ремонті" phones={repairs.start} />
        ))}
      {showFinishRepair &&
        (dateFilterRepairs.length === 0 ? (
          <EmptyText text={'Відремонтованих телефонів немає'} />
        ) : (
          <>
            <Profit items={dateFilterRepairs} />
            <ListRepairFinish
              textStatus="Ремонт закінчено"
              phones={filteredRepairs}
            />
          </>
        ))}
    </Container>
  );
};

export default Repair;
