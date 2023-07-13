import { useDispatch, useSelector } from "react-redux";
import { fetchTelephones } from "../../redux/telephones/phones-operations";
import { useEffect, useState } from "react";
import ListRepair from "../../components/ListRapair/ListRepair";
import {
  filterPhones,
  findFinishPhones,
  getPhones,
  getTypesPhone,
} from "../../redux/telephones/phones-selector";
import {
  Container,
  BtnContainer,
  Bttn,
  ContainerFilter,
} from "./Repair.styled";
import Button from "@mui/material/Button";
import { Stack } from "@mui/joy";
import ListRepairFinish from "../../components/ListRapair/ListRepairFinish/ListRepairFinish";
import EmptyText from "../../components/EmptyText/EmptyText";
import Filter from "../../components/Filter/Filter";
import { useWindowSize } from "@react-hook/window-size";
import FilterDate from "../../components/FilterDate/FilterDate";
import Profit from "../../components/Profit/Profit";

const Repair = () => {
  const dispatch = useDispatch();
  const { repairs, diagnosis, purchases } = useSelector(getTypesPhone);
  const [showRepair, setShowRepair] = useState(false);
  const [width, height] = useWindowSize();

  const [showFinishRepair, setShowFinishRepair] = useState(false);
  const { filteredRepairs } = useSelector(filterPhones);
  const { dateFilterRepairs } = useSelector(findFinishPhones);
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

  // console.log(repair);
  console.log(repairs);
  console.log(diagnosis);

  return (
    <Container>
      <BtnContainer spacing={2}>
        {/* <Button
          onClick={handleClickDiagnosis}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Діагностика
        </Button>
        <Button style={{ width: "100%" }} variant="contained" color="success">
          Виконана діагностика
        </Button> */}
        <Bttn onClick={handleClickRepair} variant="contained" color="success">
          Ремонт
        </Bttn>
        <Bttn
          onClick={handleClickFinishRepair}
          variant="contained"
          color="success"
        >
          Виконаний ремонт
        </Bttn>
      </BtnContainer>
      {showFinishRepair && (
        <ContainerFilter>
          <Filter
            marginBottom={width < 768 && "15px"}
            width={width > 768 ? "240px" : "100%"}
            marginRight={width > 768 && "20px"}
          />
          <FilterDate />
        </ContainerFilter>
      )}
      {showRepair &&
        (repairs.start.length === 0 ? (
          <EmptyText text={"Телефонів на ремонті не має"} />
        ) : (
          <ListRepair textStatus="В ремонті" phones={repairs.start} />
        ))}
      {showFinishRepair &&
        (dateFilterRepairs.length === 0 ? (
          <EmptyText text={"Відремонтованих телефонів немає"} />
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
