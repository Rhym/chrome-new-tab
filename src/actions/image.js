export function image(string) {
  return {
    type: 'IMAGE_SET',
    image: string
  };
}

export function imageAuthor(string) {
  return {
    type: 'IMAGE_AUTHOR_SET',
    imageAuthor: string
  };
}

export function imageAuthorLink(string) {
  return {
    type: 'IMAGE_AUTHOR_LINK_SET',
    imageAuthorLink: string
  };
}

export function imageCache(string) {
  return {
    type: 'IMAGE_SET_CACHE',
    imageCache: string
  };
}
