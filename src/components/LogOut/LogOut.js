import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import authOperations from "../../redux/auth/auth-operatins";
import { DivButton, DivLogOut } from "./LogOut.styled";

const LogOut = ({ toggleModal }) => {
  const dispatch = useDispatch();

  const clickLogout = () => {
    dispatch(authOperations.logout());
    toggleModal();
  };

  return (
    <DivLogOut>
      <IconButton
        style={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={toggleModal}
        aria-label="delete"
      >
        <CloseIcon style={{ width: "30px", height: "30px" }} />
      </IconButton>
      <p>Ви дійсно бажаєте вийти з цього аккаунту ?</p>
      <DivButton>
        <Button
          style={{ width: "100%", marginRight: "20px" }}
          color="success"
          variant="contained"
          onClick={clickLogout}
        >
          Вийти!
        </Button>
        <Button
          onClick={toggleModal}
          style={{ width: "100%" }}
          variant="contained"
          color="error"
        >
          Ні! Закрити вікно
        </Button>
      </DivButton>
    </DivLogOut>
  );
};

export default LogOut;
