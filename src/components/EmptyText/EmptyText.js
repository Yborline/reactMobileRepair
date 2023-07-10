import { Container } from "./EmptyText.styled";

const EmptyText = ({ text }) => {
  return (
    <Container>
      <h2>{text}</h2>
    </Container>
  );
};

export default EmptyText;
