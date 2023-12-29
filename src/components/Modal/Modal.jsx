import { useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ closeModal, modalData }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = modalData;
  return (
    <div className={css.overlay} onClick={handleBackDropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}
