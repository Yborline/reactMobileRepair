import hook from "../../../hooks/hookTimer";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import BuildIcon from "@mui/icons-material/Build";
import PaidIcon from "@mui/icons-material/Paid";
import {
  LiCard,
  DivInfo,
  DivStatus,
  DivTime,
  TitleCard,
  DivButton,
  LinkPhone,
} from "./ItemRepair.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import FormDate from "../../FormDate/FormDate";
import { useDispatch } from "react-redux";
import {
  changePrice,
  changeStatusStart,
} from "../../../redux/telephones/phones-operations";
import FormPrice from "../../FormPrice/FormPrice";
import FormDescription from "../../FormDescription/FormDescription";
import choiceMoney from "../../../helpers/choiceMoney";

const ItemRepair = ({ item, textStatus }) => {
  const [showTime, setShowTime] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);
  const [showModalPrice, setShowModalPrice] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [openRepairPrice, setOpenRepairPrice] = useState(false);

  const dispatch = useDispatch();
  const {
    model,
    brand,
    statusRepair,
    status,
    description,
    finishDay,
    name,
    numberPhone,
    moneyDiagnosis,
    moneyRepair,
    _id,
    repairPrice,
  } = item;
  const arrayTime = finishDay.split("T");
  const normalTime = arrayTime.join(" ");
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime, setFinalTime] = hook.useFinaltimer(finishDay, "");
  console.log(finalTime);
  const toggleModal = () => {
    setShowModalTime(!showModalTime);
  };
  const toggleModalPrice = () => {
    setShowModalPrice(!showModalPrice);
    setOpenRepairPrice(false);
  };
  const toggleModalDescription = () => {
    setShowModalDescription(!showModalDescription);
  };

  const toggleModalPriceRepairMoney = () => {
    setShowModalPrice(!showModalPrice);
    setOpenRepairPrice(true);
  };

  const submitPrice = (money) => {
    if (openRepairPrice) {
      dispatch(changePrice({ id: _id, other: money, key: "repairPrice" }));
    } else {
      dispatch(
        changePrice({ id: _id, other: money, key: choiceMoney(status) })
      );
    }
    toggleModalPrice();
  };
  return (
    <LiCard style={{ position: "relative" }}>
      <div>
        <TitleCard>{headerString}</TitleCard>
        <DivStatus status={statusRepair}>
          <p>{textStatus}</p>
        </DivStatus>

        <DivInfo>
          <p>{description}</p>
          <div>
            <IconButton
              onClick={toggleModalDescription}
              //   disabled={values.brand !== null ? false : true}
              //   onClick={toggleModal}
              aria-label="change description"
            >
              <EditIcon />
            </IconButton>
          </div>
        </DivInfo>

        <DivInfo>
          <p>{name}</p>
          {/* <IconButton aria-label="change name">
            <EditIcon />
          </IconButton> */}
        </DivInfo>
        <DivInfo>
          <LinkPhone href={`tel:+${numberPhone}`}>{numberPhone}</LinkPhone>
          {/* <p>{numberPhone}</p> */}
          {/* <IconButton aria-label="change number phone">
            <EditIcon />
          </IconButton> */}
        </DivInfo>
        <DivInfo>
          {status === "repair" ? (
            <>
              <p>{moneyRepair} грн.</p>
              <IconButton onClick={toggleModalPrice} aria-label="change price">
                <PaidIcon />
              </IconButton>
              <p>{repairPrice} грн.</p>
              <IconButton
                onClick={toggleModalPriceRepairMoney}
                aria-label="change price"
              >
                <BuildIcon />
              </IconButton>
            </>
          ) : (
            <>
              {" "}
              <p>{moneyDiagnosis} грн.</p>
              <IconButton onClick={toggleModalPrice} aria-label="change price">
                <EditIcon />
              </IconButton>
            </>
          )}
        </DivInfo>
        <DivTime>
          <DivInfo>
            <Button
              onClick={() => setShowTime(!showTime)}
              color="error"
              size="normal"
            >
              {normalTime}
            </Button>

            <IconButton onClick={toggleModal} aria-label="change">
              <EditIcon />
            </IconButton>
          </DivInfo>
          {showTime &&
            (finalTime === false ? (
              <p>время закончилось</p>
            ) : (
              <p>{finalTime}</p>
            ))}
        </DivTime>
      </div>
      <DivButton>
        <Button
          onClick={() =>
            dispatch(changeStatusStart({ id: _id, statusRepair: "finish" }))
          }
          style={{ width: "100%", marginLeft: "10px" }}
          variant="contained"
          color="success"
        >
          Виконано
        </Button>
      </DivButton>
      {showModalTime && (
        <Modal close={toggleModal}>
          <FormDate
            id={_id}
            time={true}
            toggleModal={toggleModal}
            status={status}
          />
        </Modal>
      )}
      {showModalPrice && (
        <Modal close={toggleModalPrice}>
          <FormPrice
            price={
              status === "repair"
                ? openRepairPrice
                  ? repairPrice
                  : moneyRepair
                : moneyDiagnosis
            }
            id={_id}
            status={status}
            close={toggleModalPrice}
            submit={submitPrice}
          />
        </Modal>
      )}
      {showModalDescription && (
        <Modal close={toggleModalDescription}>
          <FormDescription
            id={_id}
            status={status}
            close={toggleModalDescription}
          />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemRepair;
