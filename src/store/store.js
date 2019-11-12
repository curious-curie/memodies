import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import searchTracks from '../reducer/search-reducer';
import postReducer from '../reducer/post-reducer';
import playlistReducer from '../reducer/playlist-reducer';
import auth from '../reducer/auth'

import thunk from 'redux-thunk'

const reducers = combineReducers({
  search: searchTracks,
  post: postReducer,
  auth: auth,
  playlist: playlistReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

console.log(store.getState());
export default store;