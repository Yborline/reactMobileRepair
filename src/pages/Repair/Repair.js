import { useDispatch, useSelector } from "react-redux";
import { fetchTelephones } from "../../redux/telephones/phones-operations";
import { useEffect } from "react";
import ListRepair from "../../ListRapair/ListRepair";
import { getPhones } from "../../redux/telephones/phones-selector";
import { Container } from "./Repair.styled";

const Repair = () => {
  const dispatch = useDispatch();
  const phones = useSelector(getPhones);

  useEffect(() => {
    dispatch(fetchTelephones());
  }, [dispatch]);

  return (
    <Container>
      <ListRepair phones={phones.repair} />
    </Container>
  );
};

export default Repair;
