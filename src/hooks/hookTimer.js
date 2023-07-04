import { useEffect, useState, useRef, useMemo } from "react";
import finalDay from "./finalDay";

const useFinaltimer = (date, defaultValue) => {
  const intervalId = useRef(null);

  //   const today = useMemo(() => {
  //     return new Date();
  //   }, []);
  console.log(date);
  const finalD = finalDay(date, new Date());
  const [state, setState] = useState(() => {
    return date ? finalD : defaultValue;
  });

  useEffect(() => {
    intervalId.current = setInterval(() => {
      const day = new Date();
      //   setTime(new Date());
      const finaly = finalDay(date, day);

      setState(finalDay(date, day));
    }, 30000);
    return () => {
      stop();
    };
  }, [date]);
  const stop = () => {
    clearInterval(intervalId.current);
  };

  return [state, setState];
};

const hook = {
  useFinaltimer,
};

export default hook;
