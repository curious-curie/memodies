import {createStore, compose, applyMiddleware} from 'redux';
import searchTracks from '../reducer/search-reducer';

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  searchTracks,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export default store;