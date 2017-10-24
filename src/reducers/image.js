/**
 * @param state
 * @param action
 * @returns {*}
 */
export function image(state = null, action) {
  switch (action.type) {
    case 'IMAGE_SET':
      return action.image;
    default:
      return state;
  }
}

/**
 * @param state
 * @param action
 * @returns {*}
 */
export function imageAuthor(state = null, action) {
  switch (action.type) {
    case 'IMAGE_AUTHOR_SET':
      return action.imageAuthor;
    default:
      return state;
  }
}

/**
 * @param state
 * @param action
 * @returns {*}
 */
export function imageAuthorLink(state = null, action) {
  switch (action.type) {
    case 'IMAGE_AUTHOR_LINK_SET':
      return action.imageAuthorLink;
    default:
      return state;
  }
}

/**
 * @param state
 * @param action
 * @returns {*}
 */
export function imageCache(state = null, action) {
  switch (action.type) {
    case 'IMAGE_SET_CACHE':
      return action.imageCache;
    default:
      return state;
  }
}

/**
 * @param state
 * @param action
 * @returns {*}
 */
export function imageCategory(state = 'landscape', action) {
  switch (action.type) {
    case 'IMAGE_CATEGORY_SET':
      return action.imageCategory;
    default:
      return state;
  }
}
