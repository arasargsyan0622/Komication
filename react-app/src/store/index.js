import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import serverReducer from "./server"
import currServerReducer from './current_server';
import currChannelReducer from "./current_channel";
import directMessagesReducer from './direct_messages';

const rootReducer = combineReducers({
  session,
  servers: serverReducer,
  current_server: currServerReducer,
  current_channel: currChannelReducer,
  direct_messages: directMessagesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
