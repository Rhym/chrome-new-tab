import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import './Quote.css';

const QUOTE_API = 'https://www.reddit.com/r/showerthoughts/hot/.json?count=1';

class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cache: localStorage.getItem('QuoteCache'),
      quote: localStorage.getItem('QuoteTitle'),
    }
  }

  componentDidMount() {
    this.fetchQuoteData();
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
    return moment(cache).isSame(now, 'hour');
  }

  fetchQuoteData() {
    if (!this.isCacheActive()) {
      axios.get(QUOTE_API)
        .then(response => {
          const now = moment().format();
          const title = response.data.data.children[0].data.title;

          localStorage.setItem('QuoteCache', now);
          localStorage.setItem('QuoteTitle', title);

          this.setState({
            cache: now,
            quote: title,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    if (typeof this.state.quote !== 'undefined' && this.state.quote !== null) {
      return (
        <span className="quote">{this.state.quote}</span>
      );
    }

    return null;
  }

}

export default Quote;