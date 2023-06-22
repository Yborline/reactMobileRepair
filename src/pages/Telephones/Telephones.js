import { useSelector } from "react-redux";
import ListPurchase from "../../components/ListPurchase/ListPurchase";
import { getTypesPhone } from "../../redux/telephones/phones-selector";
import FormDate from "../../components/FormDate/FormDate";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";

const Telephones = () => {
  const [showModal, setShowModal] = useState(false);
  const { purchases } = useSelector(getTypesPhone);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ListPurchase phones={purchases.start} />
    </>
  );
};

export default Telephones;
