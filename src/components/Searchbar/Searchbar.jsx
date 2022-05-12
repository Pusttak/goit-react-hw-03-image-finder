import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';
import s from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = evt => {
    this.setState({ imageName: evt.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const imageName = this.state.imageName.trim();

    if (imageName) {
      this.props.onSubmit(imageName.toLowerCase());

      this.setState({
        imageName: '',
      });
    }
  };

  render() {
    const { imageName } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              <BiSearchAlt size="32px" />
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
