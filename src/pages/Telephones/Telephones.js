import { useSelector } from "react-redux";
import ListPurchase from "../../components/ListPurchase/ListPurchase";
import {
  filterPhones,
  findFinishPhones,
  getTypesPhone,
} from "../../redux/telephones/phones-selector";
import FormDate from "../../components/FormDate/FormDate";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import EmptyText from "../../components/EmptyText/EmptyText";
import Filter from "../../components/Filter/Filter";
import {
  Bttn,
  BtnContainer,
  Container,
  ContainerFilter,
} from "./Telephones.styled";
import { useWindowSize } from "@react-hook/window-size";
import FilterDate from "../../components/FilterDate/FilterDate";
import Profit from "../../components/Profit/Profit";

const Telephones = () => {
  const { purchases } = useSelector(getTypesPhone);
  const { dateFilterPurchases } = useSelector(findFinishPhones);
  const { filteredPurchases } = useSelector(filterPhones);
  const [width, height] = useWindowSize();

  const [showPurchases, setShowPurchases] = useState(false);

  const [showFinishPurchases, setShowFinishPurchases] = useState(false);

  const handleClickFinishPurchases = () => {
    if (showPurchases) {
      setShowFinishPurchases(!showFinishPurchases);
      setShowPurchases(!showPurchases);
    }
    setShowFinishPurchases(!showFinishPurchases);
  };

  const handleClickRepair = () => {
    if (showFinishPurchases) {
      setShowFinishPurchases(!showFinishPurchases);
      setShowPurchases(!showPurchases);
    }
    setShowPurchases(!showPurchases);
  };

  return (
    <Container>
      <BtnContainer spacing={2}>
        <Bttn onClick={handleClickRepair} variant="contained" color="success">
          Куплені телефони
        </Bttn>
        <Bttn
          onClick={handleClickFinishPurchases}
          variant="contained"
          color="success"
        >
          Продані телефони
        </Bttn>
      </BtnContainer>
      {showFinishPurchases && dateFilterPurchases && (
        <ContainerFilter>
          <Filter
            marginBottom={width < 768 && "15px"}
            width={width > 768 ? "240px" : "100%"}
            marginRight={width > 768 && "20px"}
          />
          <FilterDate />
        </ContainerFilter>
      )}
      {showPurchases &&
        (purchases.start.length === 0 ? (
          <EmptyText text={"Куплених телефонів немає"} />
        ) : (
          <ListPurchase phones={purchases.start} />
        ))}
      {showFinishPurchases &&
        (purchases.finish.length === 0 ? (
          <EmptyText text={"Проданих телефонів немає"} />
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
