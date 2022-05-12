import { Component } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineClose } from 'react-icons/md';
import s from './Modal.module.scss';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <button
          className={s.closeButton}
          type="button"
          onClick={this.props.onClose}
        >
          <MdOutlineClose size="30px" color="fff" />
        </button>
        <div className={s.Modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
