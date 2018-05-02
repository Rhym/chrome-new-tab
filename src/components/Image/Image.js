import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { image, imageAuthor, imageAuthorLink, imageCache } from '../../actions/image';
import './Image.css';
import refreshIcon from './icons/refresh.svg';

const UNSPLASH_APPLICATION_ID = 'eeeef2dfe82e6732dc0d437807298a7b66b62e11aeeed3d85d33c25dbe233fb2';

const mapStateToProps = (state) => {
  return {
    author: state.imageAuthor,
    authorLink: state.imageAuthorLink,
    image: state.image,
    cache: state.imageCache,
    category: state.imageCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCache: () => dispatch(imageCache(null)),
    setImage: (string) => dispatch(image(string)),
    setImageAuthor: (string) => dispatch(imageAuthor(string)),
    setImageAuthorLink: (string) => dispatch(imageAuthorLink(string)),
    setCache: (string) => dispatch(imageCache(string)),
  };
};

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    if (!this.isCacheActive()) {
      this.fetchImageData();
    }
  }

  /**
   * @desc if the cache or image are different, then update the component.
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.cache !== nextProps.cache
      || this.props.image !== nextProps.image
      || this.props.category !== nextProps.category
      || this.state.loading !== nextState.loading
    );
  }

  /**
   * @desc If the image category changes, refresh the image.
   * @param nextProps
   */
  componentWillUpdate(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.refreshImage();
    }
  }

  /**
   * @desc Check if the cache is active (one day).
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

  /**
   * @desc Invalidated the cache, and request a new image.
   */
  refreshImage() {
    console.log('Invalidating Image cache.');
    this.props.clearCache();
    this.fetchImageData();
  }

  /**
   * @desc Get image from the API
   */
  fetchImageData() {
    console.log('Retrieving image.');
    this.setState({
      loading: !this.state.loading,
    }, () => {
      axios.get(`https://api.unsplash.com/photos/random?orientation=landscape&w=1920&h=1080&query=${this.props.category}&client_id=${UNSPLASH_APPLICATION_ID}`)
        .then(response => {
          this.setImageFromData(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
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

    this.callDownloadEndpoint(data.data.links);

    this.setState({
      loading: !this.state.loading,
    })
  }

  /**
   * @desc Send a get request to the Unsplash API to align with their new terms: https://medium.com/unsplash/unsplash-api-guidelines-triggering-a-download-c39b24e99e02
   * @param urls
   */
  callDownloadEndpoint(urls) {
    if (
      typeof urls !== 'undefined'
      && urls !== null
      && urls.download_location !== 'undefined'
      && urls.download_location !== null
    ) {
      const ENDPOINT = urls.download_location;
      axios.get(`${ENDPOINT}?client_id=${UNSPLASH_APPLICATION_ID}`)
        .catch(err => {
          console.log(err);
        });
    }
  }

  renderButton() {
    return (
      <button
        className="image__button"
        onClick={() => {
          this.refreshImage()
        }}
        disabled={this.state.loading}
        title="Get a new background image"
      >
        <img
          className="image__icon"
          src={refreshIcon}
          alt="Refresh"
        />
      </button>
    );
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
        <div className="image" style={{ backgroundImage: `url(${this.props.image})` }}>
          {this.renderButton()}
          {this.renderAuthor()}
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);
