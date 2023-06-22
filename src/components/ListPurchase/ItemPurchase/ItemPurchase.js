// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import {
  LiCard,
  DivInfo,
  DivStatus,
  TitleCard,
  DivButton,
} from "./ItemPurchase.styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../redux/telephones/phones-operations";
import FormDate from "../../FormDate/FormDate";
import Modal from "../../Modal/Modal";

const ItemPurchase = ({ phone, textStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {
    brand,
    description,
    model,
    _id,
    money,
    phonePrice,
    finishDay,
    status,
    statusRepair,
  } = phone;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const headerString = `${brand.toUpperCase()} ${model}`;

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
          <p>{phonePrice} грн.</p>
        </DivInfo>
        <DivInfo>
          <p>{finishDay}</p>
        </DivInfo>
      </div>
      {/* {status === "diagnosis" && ( */}
      <DivButton>
        <Button
          onClick={toggleModal}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          На ремонт
        </Button>
        <Button
          style={{ width: "100%", marginLeft: "10px" }}
          variant="contained"
          color="info"
        >
          На запчастини
        </Button>
      </DivButton>
      {/* )} */}
      {showModal && (
        <Modal close={toggleModal}>
          <FormDate id={_id} toggleModal={toggleModal} finishTime={finishDay} />
        </Modal>
      )}
    </LiCard>
  );
};

export default ItemPurchase;
