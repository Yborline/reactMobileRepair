import { createPortal } from 'react-dom';
import { Backdrop, ModalContent } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector(`#modal-root`);

const Modal = ({ close, children }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      close();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      close();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };
  });

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    modalRoot,
  );
};

export default Modal;
