import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ButtonClose = ({ close }) => {
  return (
    <>
      <IconButton
        style={{
          zIndex: "90",
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
        onClick={close}
        aria-label="delete"
      >
        <CloseIcon style={{ width: "30px", height: "30px" }} />
      </IconButton>
    </>
  );
};

export default ButtonClose;
