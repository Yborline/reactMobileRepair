import { useSelector } from 'react-redux';
import ListPurchase from '../../components/ListPurchase/ListPurchase';
import {
  filterPhones,
  findFinishPhonesDate,
  getTypesPhone,
} from '../../redux/telephones/phones-selector';
import { useState } from 'react';

import EmptyText from '../../components/EmptyText/EmptyText';
import Filter from '../../components/Filter/Filter';
import { BtnContainer, Container, ContainerFilter } from './Telephones.styled';
import { useWindowSize } from '@react-hook/window-size';
import FilterDate from '../../components/FilterDate/FilterDate';
import Profit from '../../components/Profit/Profit';
import { BttnSuccess } from '../../components/BttnSuccess/BttnSuccess';
import { useToggleButton } from '../../hooks/useToggleButton';

const Telephones = () => {
  const { purchases } = useSelector(getTypesPhone);
  const { dateFilterPurchases } = useSelector(findFinishPhonesDate);
  const { filteredPurchases } = useSelector(filterPhones);
  const [width] = useWindowSize();
  const { showFirstBtn, showSecondBtn, toggleFirst, toggleSecond } =
    useToggleButton();

  return (
    <Container>
      <BtnContainer spacing={2}>
        <BttnSuccess handleClick={toggleFirst}>Куплені телефони</BttnSuccess>
        <BttnSuccess handleClick={toggleSecond}>Продані телефони</BttnSuccess>
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
        (purchases.start.length === 0 ? (
          <EmptyText text={'Куплених телефонів немає'} />
        ) : (
          <ListPurchase phones={purchases.start} />
        ))}
      {showSecondBtn &&
        (dateFilterPurchases.length === 0 ? (
          <EmptyText text={'Проданих телефонів немає'} />
        ) : (
          <>
            <Profit items={dateFilterPurchases} />
            <ListPurchase phones={filteredPurchases} />
          </>
        ))}
    </Container>
  );
};

export default Telephones;
