import { useEffect, useRef, useState } from 'react';

export const useHookAlert = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);

      return () => clearTimeout(timer);
    }, 5000);
  }, [open]);

  return { open, setOpen };
};
