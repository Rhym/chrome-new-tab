export function image(state = null, action) {
  switch (action.type) {
    case 'IMAGE_SET':
      return action.image;
    default:
      return state;
  }
}

export function imageAuthor(state = null, action) {
  switch (action.type) {
    case 'IMAGE_AUTHOR_SET':
      return action.imageAuthor;
    default:
      return state;
  }
}

export function imageAuthorLink(state = null, action) {
  switch (action.type) {
    case 'IMAGE_AUTHOR_LINK_SET':
      return action.imageAuthorLink;
    default:
      return state;
  }
}

export function imageCache(state = null, action) {
  switch (action.type) {
    case 'IMAGE_SET_CACHE':
      return action.imageCache;
    default:
      return state;
  }
}
