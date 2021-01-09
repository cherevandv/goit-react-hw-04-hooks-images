import PropTypes from 'prop-types';

function ImageGalleryItem({ name, url, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt={name}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
