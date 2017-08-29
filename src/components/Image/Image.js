import React, {Component} from 'react';
import classNames from 'classnames';
import axios from 'axios';
import moment from 'moment';

import './Image.css';

const UNSPLASH_APPLICATION_ID = 'eeeef2dfe82e6732dc0d437807298a7b66b62e11aeeed3d85d33c25dbe233fb2';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: localStorage.getItem('ImageUrl'),
      authorLink: localStorage.getItem('ImageAuthorLink'),
      authorName: localStorage.getItem('ImageAuthorName'),
      cache: localStorage.getItem('ImageCache'),
      isLoading: true,
      hasError: false,
    }
  }

  componentDidMount() {
    this.fetchImageData(`https://api.unsplash.com/photos/random?orientation=landscape&w=1920&h=1080&query=landscape&client_id=${UNSPLASH_APPLICATION_ID}`);
  }

  /**
   * Check if the cache is active (one day).
   *
   * @returns {boolean}
   */
  isCacheActive() {
    const cache = this.state.cache;

    // If there is no cache.
    if (typeof cache === 'undefined' || cache === null) {
      return false;
    }

    const now = moment().format();
    return moment(cache).isSame(now, 'day');
  }

  /**
   * Get image from the API
   *
   * @param url
   */
  fetchImageData(url) {
    if (!this.isCacheActive()) {
      this.setState({isLoading: true});

      axios.get(url)
        .then(response => {
          this.setImageFromData(response);
        })
        .catch(err => {
          this.setState({hasError: true});
          console.log(err)
        });
    }
  }

  /**
   * @param data
   */
  setImageFromData(data) {
    const url = data.data.urls.custom;
    const author = data.data.user;
    const now = moment().format();

    // Set the local storage.
    localStorage.setItem('ImageUrl', url);
    localStorage.setItem('ImageAuthorName', author.name);
    localStorage.setItem('ImageAuthorLink', author.links.html);
    localStorage.setItem('ImageCache', now);

    this.setState({
      isLoading: false,
      imageUrl: url,
      authorLink: author.links.html,
      authorName: author.name,
      cache: now,
    });
  }

  renderAuthor() {
    return (
      <div className="image__author">
        Photo by <a href={this.state.authorLink} target="_blank" rel="noopener noreferrer">{this.state.authorName}</a> / <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return <p>Error retrieving data</p>
    }

    const classes = classNames('image', {
      'image--loaded': !this.state.isLoading,
    });

    return (
      <div
        className={classes}
        style={{backgroundImage: `url(${this.state.imageUrl})`}}
      >
        {this.renderAuthor()}
      </div>
    );
  }
}

export default Image;