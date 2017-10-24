/**
 * @param string
 * @returns {{type: string, image: *}}
 */
export function image(string) {
  return {
    type: 'IMAGE_SET',
    image: string
  };
}

/**
 * @param string
 * @returns {{type: string, imageAuthor: *}}
 */
export function imageAuthor(string) {
  return {
    type: 'IMAGE_AUTHOR_SET',
    imageAuthor: string
  };
}

/**
 * @param string
 * @returns {{type: string, imageAuthorLink: *}}
 */
export function imageAuthorLink(string) {
  return {
    type: 'IMAGE_AUTHOR_LINK_SET',
    imageAuthorLink: string
  };
}

/**
 * @param string
 * @returns {{type: string, imageCache: *}}
 */
export function imageCache(string) {
  return {
    type: 'IMAGE_SET_CACHE',
    imageCache: string
  };
}

/**
 * @param string
 * @returns {{type: string, imageCategory: *}}
 */
export function imageCategory(string) {
  return {
    type: 'IMAGE_CATEGORY_SET',
    imageCategory: string
  };
}
