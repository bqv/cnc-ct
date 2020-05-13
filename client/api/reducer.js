import {List, Map, OrderedMap} from 'immutable';

import {API_DATA_TRACKS_LOADED, API_DATA_TRACK_LOADED, API_REQUEST_FINISHED, API_REQUEST_STARTED} from 'api/actions';

const initialState = Map({
  loading: false,
  requests: OrderedMap({}),
  errors: Map({
    last: null
  }),
  lastUpdate: Map({
    tracks: null,
    track: null
  }),
  data: Map({
    tracks: List(),
    track: null
  })
});

export default function ApiReducer(state = initialState, action) {
  switch (action.type) {
    case API_REQUEST_STARTED:
      return state.setIn(['requests', action.payload.requestId], action.payload).set('loading', true);

    case API_REQUEST_FINISHED:
      return state
        .removeIn(['requests', action.payload.requestId])
        .set('loading', state.get('requests').size > 1)
        .setIn(
          ['errors', 'last'],
          action.payload.error ? action.payload.error.message : state.getIn(['errors', 'last'])
        );

    case API_DATA_TRACKS_LOADED:
      return state
        .setIn(['lastUpdate', 'tracks'], Date.now())
        .setIn(['data', 'tracks'], List(Object.values(action.payload)));

    case API_DATA_TRACK_LOADED:
      return state.setIn(['lastUpdate', 'track'], Date.now()).setIn(['data', 'track'], action.payload);

    default:
      return state;
  }
}
