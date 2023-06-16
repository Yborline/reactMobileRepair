import hook from "../../hooks/hookTimer";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import IconButton from "@mui/material/IconButton";
import {
  LiCard,
  DivInfo,
  DivStatus,
  DivTime,
  TitleCard,
} from "./ItemRepair.styled";
import Button from "@mui/material/Button";
import { useState } from "react";

const ItemRepair = ({ item }) => {
  const {
    model,
    brand,
    statusRepair,
    description,
    finishDay,
    name,
    numberPhone,
    money,
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
        <DivStatus>
          <p>{statusRepair === "start" ? "В ремонті" : "Закінчено"}</p>
        </DivStatus>

        <DivInfo>
          <p>{description}</p>
          <div>
            <IconButton
              //   disabled={values.brand !== null ? false : true}
              //   onClick={toggleModal}
              aria-label="delete"
            >
              <LibraryAddIcon />
            </IconButton>
          </div>
        </DivInfo>

        <DivInfo>
          <p>{name}</p>
          <IconButton aria-label="delete">
            <LibraryAddIcon />
          </IconButton>
        </DivInfo>
        <DivInfo>
          <p>{numberPhone}</p>
          <IconButton aria-label="delete">
            <LibraryAddIcon />
          </IconButton>
        </DivInfo>
        <DivInfo>
          <p>{money} грн.</p>
          <IconButton aria-label="delete">
            <LibraryAddIcon />
          </IconButton>
        </DivInfo>
        <DivTime>
          <DivInfo>
            <Button onClick={() => setShowTime(!showTime)} size="normal">
              {normalTime}
            </Button>

            <IconButton aria-label="delete">
              <LibraryAddIcon />
            </IconButton>
          </DivInfo>
          {showTime && <p>{finalTime}</p>}
        </DivTime>
      </div>
      <Button style={{ width: "100%" }} variant="contained" color="success">
        Виконано
      </Button>
    </LiCard>
  );
};

export default ItemRepair;
