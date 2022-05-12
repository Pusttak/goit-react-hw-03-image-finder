import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';

class App extends Component {
  state = {
    imageName: '',
  };

  onSubmit = imageName => {
    this.setState({
      imageName,
    });
  };

  render() {
    const { imageName } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery imageName={imageName} />
      </div>
    );
  }
}

export default App;
