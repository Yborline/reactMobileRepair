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
} from "./ItemRepair.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import FormDate from "../../FormDate/FormDate";

const ItemRepair = ({ item, textStatus }) => {
  const {
    model,
    brand,
    statusRepair,
    status,
    description,
    finishDay,
    name,
    numberPhone,
    money,
    _id,
  } = item;
  const arrayTime = finishDay.split("T");
  const normalTime = arrayTime.join(" ");
  const headerString = `${brand.toUpperCase()} ${model}`;
  const [finalTime, setFinalTime] = hook.useFinaltimer(finishDay, "");
  const [showTime, setShowTime] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);

  const toggleModal = () => {
    setShowModalTime(!showModalTime);
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
              //   disabled={values.brand !== null ? false : true}
              //   onClick={toggleModal}
              aria-label="delete"
            >
              <EditIcon />
            </IconButton>
          </div>
        </DivInfo>

        <DivInfo>
          <p>{name}</p>
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
        </DivInfo>
        <DivInfo>
          <p>{numberPhone}</p>
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
        </DivInfo>
        <DivInfo>
          <p>{money} грн.</p>
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
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

            <IconButton onClick={toggleModal} aria-label="delete">
              <EditIcon />
            </IconButton>
          </DivInfo>
          {showTime && <p>{finalTime}</p>}
        </DivTime>
      </div>
      <DivButton>
        <Button
          style={{ width: "100%", marginLeft: "10px" }}
          variant="contained"
          color="success"
        >
          Виконано
        </Button>
      </DivButton>
      {showModalTime && (
        <Modal close={toggleModal}>
          <FormDate id={_id} toggleModal={toggleModal} status={status} />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemRepair;
