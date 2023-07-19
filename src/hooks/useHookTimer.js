import { useEffect, useState, useRef } from 'react';
import finalDay from '../helpers/finalDay';

const useFinaltimer = (date, defaultValue) => {
  const intervalId = useRef(null);

  const [state, setState] = useState(() => finalDay(date, new Date()));

  useEffect(() => {
    const day = new Date();
    setState(finalDay(date, day));
    if (state) {
      intervalId.current = setInterval(() => {
        const day = new Date();
        setState(finalDay(date, day));
      }, 30000);
    }

    return () => {
      stop();
    };
  }, [date, state]);
  const stop = () => {
    clearInterval(intervalId.current);
  };

  return [state, setState];
};

const hook = {
  useFinaltimer,
};

export default hook;
