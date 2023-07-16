import { Bttn } from "./BttnSuccess.styled";

export const BttnSuccess = ({ handleClick, children }) => {
  return (
    <Bttn onClick={handleClick} variant="contained" color="success">
      {children}
    </Bttn>
  );
};
