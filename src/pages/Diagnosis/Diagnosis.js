import { useSelector } from "react-redux";
import ListRepair from "../../components/ListRapair/ListRepair";
import {
  findFinishPhones,
  findFinishPurchases,
  getTypesPhone,
} from "../../redux/telephones/phones-selector";
import { Button, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { Container } from "./Diagnosis.styled";
import ListRepairFinish from "../../components/ListRapair/ListRepairFinish/ListRepairFinish";
import EmptyText from "../../components/EmptyText/EmptyText";
import Filter from "../../components/Filter/Filter";

const Diagnosis = () => {
  const { diagnosis } = useSelector(getTypesPhone);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showFinishDiagnosis, setShowFinishDiagnosis] = useState(false);
  const { filteredDiagnosis } = useSelector(findFinishPhones);
  const handleClickDiagnosis = () => {
    if (showFinishDiagnosis) {
      setShowDiagnosis(!showDiagnosis);
      setShowFinishDiagnosis(!showFinishDiagnosis);
    }
    setShowDiagnosis(!showDiagnosis);
  };

  // useEffect(() => {
  //       dispatch(fetchTelephones());
  // })

  const handleClickFinishDiagnosis = () => {
    if (showDiagnosis) {
      setShowDiagnosis(!showDiagnosis);
      setShowFinishDiagnosis(!showFinishDiagnosis);
    }
    setShowFinishDiagnosis(!showFinishDiagnosis);
  };

  return (
    <>
      <Stack spacing={2}>
        <Button
          onClick={handleClickDiagnosis}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Діагностика
        </Button>
        <Button
          onClick={handleClickFinishDiagnosis}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Виконана діагностика
        </Button>
      </Stack>
      {showDiagnosis &&
        (diagnosis.start.length === 0 ? (
          <EmptyText text={"Телефонів на діагностиці не має"} />
        ) : (
          <ListRepair
            textStatus="Діагностика розпочата"
            phones={diagnosis.start}
          />
        ))}
      {showFinishDiagnosis &&
        (diagnosis.finish.length === 0 ? (
          <EmptyText text={"Телефонів після діагностики немає"} />
        ) : (
          <>
            {" "}
            <Filter />
            <ListRepairFinish
              textStatus="Діагностика закінчена"
              phones={filteredDiagnosis}
            />
          </>
        ))}
    </>
  );
};

export default Diagnosis;
