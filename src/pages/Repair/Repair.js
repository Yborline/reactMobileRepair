import { useDispatch, useSelector } from "react-redux";
import { fetchTelephones } from "../../redux/telephones/phones-operations";
import { useEffect, useState } from "react";
import ListRepair from "../../ListRapair/ListRepair";
import {
  getPhones,
  getTypesPhone,
} from "../../redux/telephones/phones-selector";
import { Container } from "./Repair.styled";
import Button from "@mui/material/Button";
import { Stack } from "@mui/joy";

const Repair = () => {
  const dispatch = useDispatch();
  const { repairs, diagnosis, purchases } = useSelector(getTypesPhone);
  const [showRepair, setShowRepair] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showFinishRepair, setShowFinishRepair] = useState(false);
  const [showFinishDiagnosis, setShowFinishDiagnosis] = useState(false);

  const handleCloseAllWithoutOne = () => {
    setShowDiagnosis(!showDiagnosis);
    setShowRepair(!showRepair);
  };

  const handleClickDiagnosis = () => {
    if (showRepair) {
      handleCloseAllWithoutOne();
    }
    setShowDiagnosis(!showDiagnosis);
  };
  const handleClickRepair = () => {
    if (showDiagnosis) {
      handleCloseAllWithoutOne();
    }
    setShowRepair(!showRepair);
  };

  useEffect(() => {
    dispatch(fetchTelephones());
  }, [dispatch]);

  // console.log(repair);
  console.log(repairs);
  console.log(diagnosis);

  return (
    <Container>
      <Stack spacing={2}>
        <Button
          onClick={handleClickDiagnosis}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Діагностика
        </Button>
        <Button style={{ width: "100%" }} variant="contained" color="success">
          Виконана діагностика
        </Button>
        <Button
          onClick={handleClickRepair}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Ремонт
        </Button>
        <Button style={{ width: "100%" }} variant="contained" color="success">
          Виконаний ремонт
        </Button>
      </Stack>
      {showRepair && <ListRepair phones={repairs.start} />}
      {showDiagnosis && <ListRepair phones={diagnosis.start} />}
    </Container>
  );
};

export default Repair;
