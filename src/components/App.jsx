import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar';
import API from '../services/api';
import ImageGallery from './ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './App.module.css';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    loader: false,
    activeImg: '',
    showModal: false,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== imageName && imageName !== '') {
      this.setState({ images: [], page: 1 });
      this.fetchImages(imageName, page);
    }

    if (prevState.page !== page && page !== 1) {
      this.fetchImages(imageName, page);
    }
  }

  fetchImages = (imageName, page) => {
    this.setState({ loader: true });
    API(imageName, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          totalImages: images.totalHits,
        }));
        if (this.state.page === 1) {
          if (images.totalHits === 0) {
            toast.error('Nothing found');
          } else {
            toast.success(`Found ${images.totalHits} images`);
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  onSubmit = imageName => {
    this.setState({
      imageName,
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setActiveImg = imageUrl => {
    this.setState({
      activeImg: imageUrl,
    });
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

  render() {
    const { images, loader, showModal, activeImg, page, totalImages } =
      this.state;
    const loadMore = totalImages / 12 > page;

    return (
      <div className={s.App}>
        <Toaster position="top-right" reverseOrder={false} />
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            setImageModal={this.setActiveImg}
            onOpenModal={this.toggleModal}
          />
        )}
        {loader && <Loader />}
        {images.length !== 0 && loadMore && (
          <LoadMoreButton onClick={this.incrementPage} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={activeImg} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
