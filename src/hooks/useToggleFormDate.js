import { useState } from 'react';

export const useToggleFormDate = (initialState = false) => {
  const [isOpenDate, setIsOpenDate] = useState(initialState);
  const open = () => setIsOpenDate(true);
  const close = () => setIsOpenDate(false);
  const toggleDate = () => setIsOpenDate(isOpenDate => !isOpenDate);

  return { isOpenDate, open, close, toggleDate };
};
