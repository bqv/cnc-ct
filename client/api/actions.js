import {createAction} from 'redux-actions';

import api from 'api/index';
import {showModal} from 'containers/ModalsLayout/actions';
import ErrorWindow from 'components/ErrorWindow';

function* createGuidGenerator() {
  let i = 1;
  while (i) {
    yield i++;
  }
}

const guidGenerator = createGuidGenerator();

export const API_REQUEST_STARTED = 'API_REQUEST_STARTED';
export const apiRequestStarted = createAction(API_REQUEST_STARTED);
export const API_REQUEST_FINISHED = 'API_REQUEST_FINISHED';
export const apiRequestFinished = createAction(API_REQUEST_FINISHED);

export const API_DATA_TRACKS_LOADED = 'API_DATA_TRACKS_LOADED';
export const apiDataTracksLoaded = createAction(API_DATA_TRACKS_LOADED);
export const API_DATA_TRACK_LOADED = 'API_DATA_TRACK_LOADED';
export const apiDataTrackLoaded = createAction(API_DATA_TRACK_LOADED);

export function apiGetTracks(callback) {
  return function dispatchApiGetTracks(dispatch) {
    const requestId = guidGenerator.next().value;
    dispatch(apiRequestStarted({requestId}));
    return api
      .getTracks()
      .then((data) => {
        dispatch(apiDataTracksLoaded(data));
        dispatch(apiRequestFinished({requestId}));
        if (callback) {
          callback(); // get rid of callback here?
        }
      })
      .catch((error) => {
        dispatch(apiRequestFinished({requestId, error}));
        dispatch(
          showModal({
            key: ErrorWindow.NAME,
            props: {
              title: error.title,
              message: error.message,
              explanation: `URL: ${error.url} ${error.statusCode}`
            }
          })
        );
      });
  };
}

export function apiGetTrack(id, callback) {
  return function dispatchApiGetTrack(dispatch) {
    const requestId = guidGenerator.next().value;
    dispatch(apiRequestStarted({requestId}));
    return api
      .getTrack(id)
      .then((data) => {
        dispatch(apiDataTrackLoaded(data));
        dispatch(apiRequestFinished({requestId}));
        if (callback) {
          callback(data);
        }
      })
      .catch((error) => {
        dispatch(apiRequestFinished({requestId, error}));
        dispatch(
          showModal({
            key: ErrorWindow.NAME,
            props: {
              title: error.title,
              message: error.message,
              explanation: `URL: ${error.url} ${error.statusCode}`
            }
          })
        );
      });
  };
}
