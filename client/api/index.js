const defaultParams = {
  mode: 'cors'
};

let endpoint = '';

function setEndpoint(value) {
  endpoint = value;
}

/**
 * @param {String} url
 * @param {String} message
 * @param {Number} statusCode
 * @constructor
 */
function ApiError(url, message, statusCode) {
  this.url = url;
  this.message = message;
  this.statusCode = statusCode || '';
  this.title = 'API Error';
  this.stack = new Error().stack;
}

/**
 * @param {String} url
 * @param {Error} error
 * @param {Number|undefined} statusCode
 * @throws {ApiError}
 */
function throwApiError(url, error, statusCode) {
  throw new ApiError(url, error, statusCode);
}

/**
 * @param {Object} params
 * @returns {Promise.<T>}
 * @private
 */
function _request(params) {
  let requestUrl;
  let requestParams;
  if (typeof params === 'string') {
    requestUrl = params;
    requestParams = {};
  } else {
    const {url, ...restParams} = params;
    requestUrl = url;
    requestParams = restParams;
  }

  let rawResponse;
  return fetch(requestUrl, {...defaultParams, ...requestParams})
    .then((response) => {
      rawResponse = response;
      return response.json();
    })
    .then((json) => {
      if (json && json.error) {
        return throwApiError(requestUrl, json.error, rawResponse.status);
      }
      return json;
    })
    .catch((error) => throwApiError(requestUrl, error.message));
}

// application api

function getTracks() {
  return _request(`${endpoint}/track`);
}
function getTrack(id) {
  return _request(`${endpoint}/track/${id}`);
}

function getArtists() {
  return _request(`${endpoint}/artist`);
}
function getArtist(id) {
  return _request(`${endpoint}/artist/${id}`);
}

export default {
  getTracks,
  getTrack,
  getArtists,
  getArtist,
  setEndpoint
};
