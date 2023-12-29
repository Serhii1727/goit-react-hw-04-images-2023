import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImage from 'components/services/api';
import Searchbar from './Searchbar';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import css from './App.module.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setStatus('idle');
      return;
    }

    setStatus('pending');

    fetchImage(searchQuery, page)
      .then(({ totalHits, hits }) => {
        const isShow = page < Math.ceil(totalHits / 12);

        setShowLoadMore(isShow);

        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        if (images.length === 0) {
          setStatus('rejected');
          return;
        }

        setStatus('resolved');
        setImages(prevImages => [...prevImages, ...images]);
      })
      .catch(error => {
        setStatus('rejected');
      });
  }, [page, searchQuery]);

  const handleSearchForm = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setShowLoadMore(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getImageId = id => {
    const currentImage = images.find(item => item.id === id);
    setShowModal(true);
    setModalData(currentImage);
  };

  const loadMore = () => {
    setPage(prevLoadMore => prevLoadMore + 1);
  };

  return (
    <div className={css.appContainer}>
      <Searchbar onSubmit={handleSearchForm} />
      {images.length > 0 && (
        <ImageGallery images={images} getImageId={getImageId} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <h1 className={css.title}>
          There was nothing found for your request "{searchQuery}"
        </h1>
      )}
      {status === 'resolved' && (
        <>
          {showLoadMore ? (
            <Button loadMore={loadMore} />
          ) : (
            <p className={css.message}>
              We're sorry, but you've reached the end of search results.
            </p>
          )}
          {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
        </>
      )}
      <ToastContainer autoClose={3000} theme="colored" />;
    </div>
  );
}
