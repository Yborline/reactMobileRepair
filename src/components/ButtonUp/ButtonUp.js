import s from './ButtonUp.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { Bttn } from './ButtonUp.styled';

const ButtonUp = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleUpButton = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 200));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {scroll > 250 && (
        <Bttn
          onClick={handleUpButton}
          className={s.button}
          fontSize="large"
          style={{ fontSize: 50 }}
        ></Bttn>
      )}
    </>
  );
};

export default ButtonUp;
