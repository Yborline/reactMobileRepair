import { useState } from 'react';

export const useToggleModalSell = (initialState = false) => {
  const [isOpenModalSell, setIsOpenModalSell] = useState(initialState);
  const open = () => setIsOpenModalSell(true);
  const close = () => setIsOpenModalSell(false);
  const toggleModalSell = () =>
    setIsOpenModalSell(isOpenModalSell => !isOpenModalSell);

  return { isOpenModalSell, open, close, toggleModalSell };
};
