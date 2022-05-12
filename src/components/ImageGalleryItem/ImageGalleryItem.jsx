import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ smallImage, tags, onClick }) => (
  <li className={s.ImageGalleryItem}>
    <img
      className={s.ImageGalleryItemImage}
      src={smallImage}
      alt={tags}
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
