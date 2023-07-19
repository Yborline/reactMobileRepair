import { useSelector } from 'react-redux';
import ListRepair from '../../components/ListRapair/ListRepair';
import {
  filterPhones,
  findFinishPhonesDate,
  getTypesPhone,
} from '../../redux/telephones/phones-selector';

import { useState } from 'react';
import ListRepairFinish from '../../components/ListRapair/ListRepairFinish/ListRepairFinish';
import EmptyText from '../../components/EmptyText/EmptyText';
import Filter from '../../components/Filter/Filter';
import { useWindowSize } from '@react-hook/window-size';
import { Container, BtnContainer, ContainerFilter } from './Diagnosis.styled';
import FilterDate from '../../components/FilterDate/FilterDate';
import Profit from '../../components/Profit/Profit';
import { BttnSuccess } from '../../components/BttnSuccess/BttnSuccess';
import { useToggleButton } from '../../hooks/useToggleButton';

const Diagnosis = () => {
  const { diagnosis } = useSelector(getTypesPhone);
  const { showFirstBtn, showSecondBtn, toggleFirst, toggleSecond } =
    useToggleButton();
  const { filteredDiagnosis } = useSelector(filterPhones);
  const { dateFilterDiagnosis } = useSelector(findFinishPhonesDate);
  const [width] = useWindowSize();

  return (
    <Container>
      <BtnContainer spacing={2}>
        <BttnSuccess handleClick={toggleFirst}>Діагностика</BttnSuccess>
        <BttnSuccess handleClick={toggleSecond}>
          Виконана діагностика
        </BttnSuccess>
      </BtnContainer>
      {showSecondBtn && (
        <ContainerFilter>
          <Filter
            marginBottom={width < 768 ? '15px' : '0px'}
            width={width > 768 ? '240px' : '100%'}
            marginRight={width > 768 ? '20px' : '0px'}
          />
          <FilterDate />
        </ContainerFilter>
      )}
      {showFirstBtn &&
        (diagnosis.start.length === 0 ? (
          <EmptyText text={'Телефонів на діагностиці не має'} />
        ) : (
          <ListRepair
            textStatus="Діагностика розпочата"
            phones={diagnosis.start}
          />
        ))}
      {showSecondBtn &&
        (dateFilterDiagnosis.length === 0 ? (
          <EmptyText text={'Телефонів після діагностики немає'} />
        ) : (
          <>
            {' '}
            <Profit items={dateFilterDiagnosis} />
            <ListRepairFinish
              textStatus="Діагностика закінчена"
              phones={filteredDiagnosis}
            />
          </>
        ))}
    </Container>
  );
};

export default Diagnosis;
