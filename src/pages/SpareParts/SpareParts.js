import { useEffect, useState } from 'react';
import ListSpareParts from '../../components/ListSpareParts/listSpareParts';
import { getAllbrand } from '../../services/api';
const SpareParts = () => {
  const [telephones, setTelephones] = useState([]);
  useEffect(() => {
    getAllbrand().then(data => setTelephones(data.allBrand));
  }, []);
  console.log('sss');
  return (
    <>
      <ListSpareParts tell={telephones} />
    </>
  );
};

export default SpareParts;
