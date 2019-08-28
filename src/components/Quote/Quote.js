import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { quote, quoteCache, quoteUrl } from '../../actions/quote';
import './Quote.css';

const mapStateToProps = state => {
  return {
    quote: state.quote,
    url: state.quoteUrl,
    quoteSource: state.quoteSource,
    quoteCache: state.quoteCache,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearQuoteCache: () => dispatch(quoteCache(null)),
    setQuote: string => dispatch(quote(string)),
    setQuoteUrl: string => dispatch(quoteUrl(string)),
    setCache: string => dispatch(quoteCache(string)),
  };
};

class Quote extends Component {
  componentDidMount() {
    if (
      typeof this.props.quoteSource !== 'undefined' &&
      this.props.quoteSource !== null &&
      this.props.quoteSource !== ''
    ) {
      this.fetchQuoteData();
    }
  }

  /**
   * @desc Invalidate the cache if there is a new setting.
   * @param prevProps
   */
  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.quoteSource !== prevProps.quoteSource) {
      console.log('invalidating quote cache');
      this.props.clearQuoteCache();
    }

    return null;
  }

  /**
   * @desc Retrieve quote if the source has changed.
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.quoteSource !== prevProps.quoteSource) {
      this.fetchQuoteData();
    }
  }

  /**
   * @desc Check if the cache is active (one day).
   * @returns {boolean}
   */
  isCacheActive() {
    const cache = this.props.quoteCache;

    // If there is no cache.
    if (typeof cache === 'undefined' || cache === null) {
      return false;
    }

    const now = moment().format();
    return moment(cache).isSame(now, 'minute');
  }

  /**
   * @desc Retrieve the data from Reddit.
   */
  fetchQuoteData() {
    if (
      !this.isCacheActive() &&
      typeof this.props.quoteSource !== 'undefined' &&
      this.props.quoteSource !== null &&
      this.props.quoteSource !== ''
    ) {
      // Get 5 items in case the Subreddit has stickied posts.
      const QUOTE_API = `https://www.reddit.com/r/${this.props.quoteSource}/hot/.json?count=5`;
      console.log('Retrieving posts from: %s', QUOTE_API);
      axios
        .get(QUOTE_API)
        .then(response => {
          const now = moment().format();
          const items = response.data.data.children;

          for (let i = 0; i < items.length; i += 1) {
            if (items[i].data.stickied === false) {
              this.props.setQuote(items[i].data.title);
              this.props.setQuoteUrl(items[i].data.url);
              this.props.setCache(now);
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    if (
      typeof this.props.quoteSource !== 'undefined' &&
      this.props.quoteSource !== null &&
      this.props.quoteSource !== ''
    ) {
      return (
        <a href={this.props.url} target="_blank" rel="noreferrer noopener" className="quote">
          {this.props.quote}
        </a>
      );
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote);
