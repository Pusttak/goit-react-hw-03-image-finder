import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './ImageGallery.module.scss';

const API_KEY = '26702272-2d7e64543fb5f8670261a42e5';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loader: false,
    activeImgIdx: 0,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.props.imageName}&page=${this.state.page}&per_page=12&image_type=photo&orientation=horizontal`;

    if (
      prevProps.imageName !== this.props.imageName &&
      this.props.imageName !== ''
    ) {
      this.setState({ images: [], page: 1 });
      this.fetchImages(url);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchImages(url);
    }
  }

  fetchImages = url => {
    this.setState({ loader: true });
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(response.status));
        }
        return response.json();
      })
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setActiveImgIdx = idx => {
    this.setState({
      activeImgIdx: idx,
    });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

  render() {
    const { images, loader, activeImgIdx, showModal } = this.state;
    const activeImage = images[activeImgIdx];

    return (
      <>
        {images.length !== 0 && (
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags }, idx) => (
              <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                tags={tags}
                onClick={() => {
                  this.setActiveImgIdx(idx);
                  this.toggleModal();
                }}
              />
            ))}
          </ul>
        )}
        {loader && <Loader />}
        {images.length !== 0 && <LoadMoreButton onClick={this.handleButton} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={activeImage.largeImageURL} alt={activeImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
