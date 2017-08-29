export function quote(string) {
  return {
    type: 'QUOTE_SET',
    quote: string
  };
}

export function quoteCache(string) {
  return {
    type: 'QUOTE_SET_CACHE',
    quoteCache: string
  };
}

export function quoteSource(string) {
  return {
    type: 'QUOTE_SET_SOURCE',
    quoteSource: string
  };
}