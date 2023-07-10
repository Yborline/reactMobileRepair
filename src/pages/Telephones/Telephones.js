import { useSelector } from "react-redux";
import ListPurchase from "../../components/ListPurchase/ListPurchase";
import {
  findFinishPhones,
  getTypesPhone,
} from "../../redux/telephones/phones-selector";
import FormDate from "../../components/FormDate/FormDate";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import EmptyText from "../../components/EmptyText/EmptyText";
import Filter from "../../components/Filter/Filter";

const Telephones = () => {
  const { purchases } = useSelector(getTypesPhone);
  const { filteredPurchases } = useSelector(findFinishPhones);

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
    <>
      <Stack spacing={2}>
        <Button
          onClick={handleClickRepair}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Куплені телефони
        </Button>
        <Button
          onClick={handleClickFinishPurchases}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Продані телефони
        </Button>
      </Stack>
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
            {" "}
            <Filter />
            <ListPurchase phones={filteredPurchases} />
          </>
        ))}
    </>
  );
};

export default Telephones;
