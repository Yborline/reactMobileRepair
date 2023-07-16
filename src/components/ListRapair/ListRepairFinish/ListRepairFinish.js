import ItemRepairFinish from '../ItemRepairFinish/ItemRepairFinish';
import { Ul } from './ListRepairFinish.styled';

const ListRepairFinish = ({ phones, textStatus }) => {
  return (
    <Ul>
      {phones &&
        phones.map(item => (
          <ItemRepairFinish
            textStatus={textStatus}
            key={item._id}
            item={item}
          />
        ))}
    </Ul>
  );
};

export default ListRepairFinish;
