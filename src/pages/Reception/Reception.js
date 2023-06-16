import FormModel from "../../components/FormReception/FormModel/FormModel";
import FormReception from "../../components/FormReception/FormReception";
import { Container } from "./Reception.styled";

const Reception = () => {
  return (
    <Container>
      <h1>Прийом товарів до ремонту або подальшого збуту</h1>
      <FormReception />
    </Container>
  );
};

export default Reception;
