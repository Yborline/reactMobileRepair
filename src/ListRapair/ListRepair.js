import ItemRepair from "./ItemRepair/ItemRepair";
import { Ul } from "./ListRepair.styled";

const ListRepair = ({ phones }) => {
  console.log(phones);

  return (
    <Ul>
      {phones &&
        phones.map((item) => <ItemRepair key={item._id} item={item} />)}
    </Ul>
  );
};

export default ListRepair;
