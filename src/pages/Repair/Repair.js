import { useDispatch } from "react-redux";
import { fetchTelephones } from "../../redux/telephones/phones-operations";
import { useEffect } from "react";

const Repair = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTelephones());
  }, [dispatch]);

  return <></>;
};

export default Repair;
