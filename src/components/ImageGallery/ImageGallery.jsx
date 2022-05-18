import React from 'react';
import PropTypes, { object } from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.scss';

const ImageGallery = ({ images, setImageModal, onOpenModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags }, idx) => (
        <ImageGalleryItem
          key={idx}
          smallImage={webformatURL}
          tags={tags}
          onClick={() => {
            setImageModal(largeImageURL);
            onOpenModal();
          }}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object).isRequired,
  setImageModal: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
