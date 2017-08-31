import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import {quote, quoteCache} from '../../actions/quote';
import './Quote.css';

const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    quoteSource: state.quoteSource,
    quoteCache: state.quoteCache,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuote: (string) => dispatch(quote(string)),
    setCache: (string) => dispatch(quoteCache(string)),
  };
};

class Quote extends Component {
  componentDidMount() {
    this.fetchQuoteData();
  }

  /**
   * Check if the cache is active (one day).
   *
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

  fetchQuoteData() {
    if (!this.isCacheActive()) {
      const QUOTE_API = `https://www.reddit.com/r/${this.props.quoteSource}/hot/.json?count=1`;
      axios.get(QUOTE_API)
        .then(response => {
          const now = moment().format();
          const title = response.data.data.children[0].data.title;

          this.props.setQuote(title);
          this.props.setCache(now);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    if (typeof this.props.quote !== 'undefined' && this.props.quote !== null) {
      return (
        <span className="quote">{this.props.quote}</span>
      );
    }

    return null;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Quote);