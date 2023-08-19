import { useMatches, useNavigate, useParams } from 'react-router-dom';
import OneElementSpareParts from '../../../components/OneElementSpareParts/OneElementSpareParts';
import { useEffect, useState } from 'react';
import { getOnePhoneStorage } from '../../../services/api';
import { Button } from '@mui/material';
const OneItemSpareParts = () => {
  let { id } = useParams();
  const [telephone, setTelephone] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(loading);
  useEffect(() => {
    setLoading(true);
    getOnePhoneStorage(id)
      .then(data => setTelephone(data.phone))
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <>
      <Button variant="contained" onClick={() => navigate('/spareParts')}>
        Назад
      </Button>
      <OneElementSpareParts
        telephone={telephone}
        query={id}
        loading={loading}
      />
    </>
  );
};
export default OneItemSpareParts;
