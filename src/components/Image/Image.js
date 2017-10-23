import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import {image, imageAuthor, imageAuthorLink, imageCache} from '../../actions/image';
import './Image.css';
import refreshIcon from './icons/refresh.svg';

const UNSPLASH_APPLICATION_ID = 'eeeef2dfe82e6732dc0d437807298a7b66b62e11aeeed3d85d33c25dbe233fb2';

const mapStateToProps = (state) => {
  return {
    author: state.imageAuthor,
    authorLink: state.imageAuthorLink,
    image: state.image,
    cache: state.imageCache,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCache: () => dispatch(imageCache(null)),
    setImageAuthor: (string) => dispatch(imageAuthor(string)),
    setImageAuthorLink: (string) => dispatch(imageAuthorLink(string)),
    setCache: (string) => dispatch(imageCache(string)),
    setImage: (string) => dispatch(image(string)),
  };
};

class Image extends Component {
  componentDidMount() {
    this.fetchImageData();
  }

  /**
   * Check if the cache is active (one day).
   *
   * @returns {boolean}
   */
  isCacheActive() {
    const cache = this.props.cache;

    // If there is no cache.
    if (typeof cache === 'undefined' || cache === null) {
      return false;
    }

    const now = moment().format();
    return moment(cache).isSame(now, 'day');
  }

  refreshImage() {
    console.log('Invalidating Image cache.');
    this.props.clearCache();
    this.fetchImageData();
  }

  /**
   * @desc Get image from the API
   */
  fetchImageData() {
    if (!this.isCacheActive()) {
      axios.get(`https://api.unsplash.com/photos/random?orientation=landscape&w=1920&h=1080&query=landscape&client_id=${UNSPLASH_APPLICATION_ID}`)
        .then(response => {
          this.setImageFromData(response);
        })
        .catch(err => {
          console.log(err);
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
    this.props.setImage(url);
    this.props.setImageAuthor(author.name);
    this.props.setImageAuthorLink(author.links.html);
    this.props.setCache(now);
  }

  renderAuthor() {
    if (
      typeof this.props.author !== 'undefined'
      && this.props.author !== null
      && this.props.author !== ''
    ) {
      return (
        <div className="image__author">
          Photo by&nbsp;
          <a
            href={`${this.props.authorLink}?utm_source=ryanpotternz&utm_medium=referral&utm_campaign=api-credit`}
            target="_blank" rel="noopener noreferrer"
          >
            {this.props.author}
          </a>
          &nbsp;/&nbsp;
          <a
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </div>
      );
    }

    return null;
  }

  render() {
    if (
      typeof this.props.image !== 'undefined'
      && this.props.image !== null
      && this.props.image !== ''
    ) {
      return (
        <div className="image" style={{backgroundImage: `url(${this.props.image})`}}>
          <button
            className="image__button"
            onClick={() => {
              this.refreshImage()
            }}
            title="Get a new background image"
          >
            <img
              className="image__icon"
              src={refreshIcon}
              alt="Refresh"
            />
          </button>
          {this.renderAuthor()}
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);
