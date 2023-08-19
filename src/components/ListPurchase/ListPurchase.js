import { useHookAlert } from '../../hooks/useHookAlert';
import ItemPurchase from './ItemPurchase/ItemPurchase';
import { Ul } from './ListPurchase.module';
import TransitionAlerts from '../../components/Alert/AlertSuccess';

const ListPurchase = ({ phones }) => {
  const { open, setOpen } = useHookAlert();
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <Ul>
      <TransitionAlerts
        open={open}
        setOpen={setOpen}
        text="Запчастини добавлені"
        top={'50px'}
      />
      {phones &&
        phones.map(item => (
          <ItemPurchase
            scrollTop={scrollTop}
            setOpen={setOpen}
            phone={item}
            key={item._id}
          />
        ))}
    </Ul>
  );
};

export default ListPurchase;
