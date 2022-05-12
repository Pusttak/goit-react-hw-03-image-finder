import PropTypes from 'prop-types';
import s from './LoadMoreButton.module.scss';

const LoadMoreButton = ({ onClick }) => (
  <button onClick={onClick} className={s.Button} type="button">
    Load More
  </button>
);

export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
