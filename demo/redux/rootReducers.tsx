import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as authReducer } from './modules/common/authModule';
import { reducer as channelsReducer } from './modules/channelsModule';
import { reducer as messagesReducer } from './modules/messagesModule';
export default () => {
  const rootReducers = combineReducers({
    authReducer: authReducer,
    channelsReducer: channelsReducer,
    messagesReducer: messagesReducer,
  });

  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducers);
};
