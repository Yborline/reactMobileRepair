import { useSelector } from "react-redux";
import ListRepair from "../../components/ListRapair/ListRepair";
import { getTypesPhone } from "../../redux/telephones/phones-selector";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { Container } from "./Diagnosis.styled";
import ListRepairFinish from "../../components/ListRapair/ListRepairFinish/ListRepairFinish";

const Diagnosis = () => {
  const { diagnosis } = useSelector(getTypesPhone);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showFinishDiagnosis, setShowFinishDiagnosis] = useState(false);

  const handleClickDiagnosis = () => {
    if (showFinishDiagnosis) {
      setShowDiagnosis(!showDiagnosis);
      setShowFinishDiagnosis(!showFinishDiagnosis);
    }
    setShowDiagnosis(!showDiagnosis);
  };

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
      {showDiagnosis && (
        <ListRepair
          textStatus="Діагностика розпочата"
          phones={diagnosis.start}
        />
      )}
      {showFinishDiagnosis && (
        <ListRepairFinish
          textStatus="Діагностика закінчена"
          phones={diagnosis.finish}
        />
      )}
    </>
  );
};

export default Diagnosis;
