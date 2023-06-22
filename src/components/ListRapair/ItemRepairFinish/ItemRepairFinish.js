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
} from "./ItemRepairFinish.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../redux/telephones/phones-operations";

const ItemRepairFinish = ({ item, textStatus }) => {
  const dispatch = useDispatch();

  const {
    model,
    brand,
    statusRepair,
    description,
    finishDay,
    name,
    numberPhone,
    money,
    status,
    phonePrice,
    _id,
  } = item;
  const arrayTime = finishDay.split("T");
  const normalTime = arrayTime.join(" ");
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime, setFinalTime] = hook.useFinaltimer(finishDay, "");
  const [showTime, setShowTime] = useState(false);

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
          <p>{numberPhone}</p>
        </DivInfo>
        <DivInfo>
          <p>{money} грн.</p>
        </DivInfo>
        <DivTime>
          <DivInfo>
            <Button onClick={() => setShowTime(!showTime)} size="normal">
              {normalTime}
            </Button>
          </DivInfo>
          {showTime && <p>{finalTime}</p>}
        </DivTime>
      </div>
      {status === "diagnosis" && (
        <DivButton>
          <Button
            onClick={() =>
              dispatch(changeStatus({ id: _id, status: "repair" }))
            }
            style={{ width: "100%" }}
            variant="contained"
            color="info"
          >
            На ремонт
          </Button>
          {/* {phonePrice > 0 && (
            <Button style={{ width: "100%" }} variant="contained" color="info">
              Продати !
            </Button>
          )} */}
        </DivButton>
      )}
    </LiCard>
  );
};

export default ItemRepairFinish;
