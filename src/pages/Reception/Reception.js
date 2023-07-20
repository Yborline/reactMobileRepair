import FormReception from '../../components/FormReception/FormReception';
import { Container } from './Reception.styled';

const Reception = () => {
  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <FormReception scroll={scrollUp} />
    </Container>
  );
};

export default Reception;
