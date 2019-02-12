// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import pageReducer from '../containers/layouts/reducer';
import loginReducer from '../pages/Login/login.reducer';
import conversationsReducer from '../pages/Conversations/conversations.reducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router           : connectRouter(history),
    page             : pageReducer,
    login            : loginReducer,
    conversations    : conversationsReducer,
  });
}
