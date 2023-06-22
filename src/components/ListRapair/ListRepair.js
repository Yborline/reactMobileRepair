import ItemRepair from "./ItemRepair/ItemRepair";
import { Ul } from "./ListRepair.styled";

const ListRepair = ({ phones, textStatus }) => {
  console.log(phones);

  return (
    <Ul>
      {phones &&
        phones.map((item) => (
          <ItemRepair textStatus={textStatus} key={item._id} item={item} />
        ))}
    </Ul>
  );
};

export default ListRepair;
