import { useSelector } from 'react-redux';
import { getStorage } from '../../redux/storage/storage-selector';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState } from 'react';
import {
  ListModel,
  LiModel,
  Ul,
  BrandButton,
  LiMain,
} from './listSpareParts.styled';

const ListSpareParts = ({ tell }) => {
  const [open, setOpen] = useState('');

  console.log();

  const handleOpen = item => {
    if (item.brand === open) {
      setOpen('');
    } else {
      setOpen(item.brand);
    }
  };

  return (
    <>
      <Ul>
        {tell.map(item => (
          <LiMain key={item._id}>
            <BrandButton variant={'contained'} onClick={() => handleOpen(item)}>
              {item.brand}
            </BrandButton>
            <ListModel>
              {open === item.brand &&
                item.model.map(model => (
                  <LiModel>
                    <Link key={model} to={model}>
                      {model}
                    </Link>
                  </LiModel>
                ))}
            </ListModel>
          </LiMain>
        ))}
      </Ul>
    </>
  );
};

export default ListSpareParts;
