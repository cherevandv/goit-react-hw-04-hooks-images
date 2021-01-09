import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from 'react-loader-spinner';
import Button from '../Button';
import Modal from '../Modal';
import { fetchImages } from '../../services/news-api';
import PropTypes from 'prop-types';

export default function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIdx, setActiveIdx] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    setActiveIdx(null);
    setStatus('pending');
    fetchImages(query, 1)
      .then(dataImages => {
        setImages(dataImages);
        if (dataImages.length === 0) {
          toast.error(`No such name exists`);
        }
      })
      .then(() => {
        setStatus('resolved');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(() => setStatus('rejected'));
  }, [query]);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    }
    setStatus('pending');
    fetchImages(query, currentPage)
      .then(dataImages => setImages(prevState => [...prevState, ...dataImages]))
      .then(() => {
        setStatus('resolved');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(() => setStatus('rejected'));
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const showImage = e => {
    const index = images.findIndex(
      image => image.webformatURL === e.target.src,
    );
    setActiveIdx(index);
    setShowModal(true);
  };

  return (
    <>
      {status === 'rejected' && toast.error(`oops ... something went wrong`)}
      {
        <ul className="ImageGallery">
          {images.map(({ tags, webformatURL }, id) => (
            <ImageGalleryItem
              key={id}
              name={tags}
              url={webformatURL}
              onClick={showImage}
            />
          ))}
        </ul>
      }
      <div className="container">
        {status === 'pending' && (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}
        {images.length > 0 && status === 'resolved' && (
          <Button onClick={handleLoadMore} />
        )}
      </div>
      {showModal && <Modal image={images[activeIdx]} onClose={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
