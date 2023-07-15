import hook from "../../../hooks/hookTimer";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import {
  LiCard,
  DivInfo,
  DivStatus,
  DivTime,
  TitleCard,
  DivButton,
  LinkPhone,
} from "./ItemRepairFinish.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../redux/telephones/phones-operations";
import Modal from "../../Modal/Modal";
import FormDate from "../../FormDate/FormDate";
import FormSellPrice from "../../FormSellPrice/FormSellPrice";
import BuildIcon from "@mui/icons-material/Build";
import PaidIcon from "@mui/icons-material/Paid";

const ItemRepairFinish = ({ item, textStatus }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalSell, setShowModalSell] = useState(false);

  const {
    model,
    brand,
    statusRepair,
    description,
    finishDay,
    name,
    endRepair,
    numberPhone,
    moneyRepair,
    moneyDiagnosis,
    moneyPurchase,
    status,
    repairPrice,
    _id,
  } = item;
  const arrayTime = finishDay.split("T");
  const normalTime = arrayTime.join(" ");
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime, setFinalTime] = hook.useFinaltimer(finishDay, "");
  const [showTime, setShowTime] = useState(false);

  console.log(endRepair);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModalSell = () => {
    setShowModalSell(!showModalSell);
  };
  // const date = new Date();
  // console.log(date.toLocaleDateString(), date.toLocaleTimeString());
  return (
    <LiCard style={{ position: "relative" }}>
      <div>
        <TitleCard>{headerString}</TitleCard>
        <DivStatus status={statusRepair}>
          <p>{textStatus}</p>
        </DivStatus>

        <DivInfo>
          <p>{description}</p>
          <div></div>
        </DivInfo>

        <DivInfo>
          <p>{name}</p>
        </DivInfo>
        <DivInfo>
          {numberPhone ? (
            <LinkPhone href={`tel:+${numberPhone}`}>{numberPhone}</LinkPhone>
          ) : (
            <p>Номер не вказано!</p>
          )}
        </DivInfo>
        <DivInfo>
          {status === "repair" ? (
            <>
              <p>{moneyRepair} грн.</p>
              <PaidIcon color="action" />

              <p>{repairPrice} грн.</p>
              <BuildIcon color="action" />
            </>
          ) : (
            <>
              {" "}
              <p>{moneyDiagnosis} грн.</p>
            </>
          )}
        </DivInfo>
        <DivTime>
          <DivInfo>
            <p> {finishDay}</p>
            {/* <Button onClick={() => setShowTime(!showTime)} size="normal">
              {finishDay}
            </Button> */}
          </DivInfo>
          {/* {showTime &&
            (finalTime === false ? (
              <p>время закончилось</p>
            ) : (
              <p>{finalTime}</p>
            ))} */}
        </DivTime>
      </div>

      {status === "diagnosis" ? (
        <DivButton>
          <Button
            onClick={toggleModal}
            style={{ width: "100%" }}
            variant="contained"
            color="info"
          >
            На ремонт
          </Button>
          {/* <Button
            onClick={() =>
              dispatch(changeStatus({ id: _id, status: "repair" }))
            }
            style={{ width: "100%" }}
            variant="contained"
            color="info"
          >
            На ремонт
          </Button> */}
          {/* {phonePrice > 0 && (
            <Button style={{ width: "100%" }} variant="contained" color="info">
              Продати !
            </Button>
          )} */}
        </DivButton>
      ) : (
        <Button
          onClick={toggleModalSell}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          Продажа
        </Button>
      )}
      {showModal && (
        <Modal close={toggleModal}>
          <FormDate
            id={_id}
            toggleModal={toggleModal}
            status={status}
            time={false}
            // finishTime={finishDay}
          />
        </Modal>
      )}
      {showModalSell && (
        <Modal close={toggleModalSell}>
          <FormSellPrice
            // price={moneyPurchase}
            id={_id}
            status={status}
            close={toggleModalSell}
          />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemRepairFinish;
