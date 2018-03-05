export function quote(state = null, action) {
  switch (action.type) {
    case 'QUOTE_SET':
      return action.quote;
    default:
      return state;
  }
}

export function quoteUrl(state = null, action) {
  switch (action.type) {
    case 'QUOTE_SET_URL':
      return action.quoteUrl;
    default:
      return state;
  }
}

export function quoteCache(state = null, action) {
  switch (action.type) {
    case 'QUOTE_SET_CACHE':
      return action.quoteCache;
    default:
      return state;
  }
}

export function quoteSource(state = null, action) {
  switch (action.type) {
    case 'QUOTE_SET_SOURCE':
      return action.quoteSource;
    default:
      return state;
  }
}
