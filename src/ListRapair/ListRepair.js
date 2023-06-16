import ItemRepair from "./ItemRepair/ItemRepair";

const ListRepair = ({ phones }) => {
  console.log(phones);

  return (
    <ul>
      {phones &&
        phones.map((item) => <ItemRepair key={item._id} item={item} />)}
    </ul>
  );
};

export default ListRepair;
