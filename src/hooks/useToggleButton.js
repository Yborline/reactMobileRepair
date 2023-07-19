import { useState } from 'react';

export const useToggleButton = () => {
  const [showFirstBtn, setShowFirstBtn] = useState(false);
  const [showSecondBtn, setShowSecondBtn] = useState(false);

  const toggleFirst = () => handleClickFirstBtn();
  const toggleSecond = () => handleClickSecondBtn();

  const handleClickSecondBtn = () => {
    if (showFirstBtn) {
      setShowSecondBtn(!showSecondBtn);
      setShowFirstBtn(!showFirstBtn);
    }
    setShowSecondBtn(!showSecondBtn);
  };

  const handleClickFirstBtn = () => {
    if (showSecondBtn) {
      setShowSecondBtn(!showSecondBtn);
      setShowFirstBtn(!showFirstBtn);
    }
    setShowFirstBtn(!showFirstBtn);
  };

  return { showFirstBtn, showSecondBtn, toggleFirst, toggleSecond };
};
