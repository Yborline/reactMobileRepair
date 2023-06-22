import ItemPurchase from "./ItemPurchase/ItemPurchase";
import { Ul } from "./ListPurchase.module";

const ListPurchase = ({ phones }) => {
  console.log(phones);
  return (
    <Ul>
      {phones &&
        phones.map((item) => <ItemPurchase phone={item} key={item._id} />)}
    </Ul>
  );
};

export default ListPurchase;
