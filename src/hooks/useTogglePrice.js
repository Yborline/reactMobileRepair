import { useState } from 'react';

export const useTogglePrice = (
  initialStateOne = false,
  initialStateTwo = false,
) => {
  const [isOpenCosts, setIsOpenCosts] = useState(initialStateOne);
  const [isOpenMoney, setIsOpenMoney] = useState(initialStateTwo);

  const toggleCoasts = () => toggleModalCoasts();
  const toggleMoney = () => toggleModalMoney();

  const toggleModalMoney = () => {
    setIsOpenCosts(false);
    setIsOpenMoney(!isOpenMoney);
  };

  const toggleModalCoasts = () => {
    setIsOpenCosts(!isOpenCosts);
    setIsOpenMoney(false);
  };

  return { isOpenCosts, isOpenMoney, toggleMoney, toggleCoasts };
};
