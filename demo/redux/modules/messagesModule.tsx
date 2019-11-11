import { call, put, take, select } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import ApiService from '@@/api/common/ApiService';
import {
  setItem as storageSetItem,
  getItem as storageGetItem,
  removeItem as storageRemoveItem,
  setPushItem as storageSetPushItem,
} from '@@/sales/localStorage/LocalStorageService';
import {
  actions as authActions,
  selectors as authSelectors,
} from '@@/sales/redux/modules/common/authModule';

import Icon from '@@/storyBook/src/atoms/Icon';

const apiService = new ApiService();

const initialState = {
  loading: false,
  errorMessage: null,
  messages: null,
};

export const selectors = {
  getMessages: state => state.messages,
  messagesErr: state => state.errorMessage,
};

export const actions = createActions({
  setMessagesData: messages => ({ messages }),
  messagesRequest: id => ({ id }),
  messagesPost: (id, params) => ({ id, params }),
});

export const reducer = handleActions(
  {
    [actions.setMessagesData]: (state, { payload }) => ({
      ...state,
      messages: payload.messages,
    }),
    [actions.messagesRequest]: state => ({ ...state, loading: true }),
    [actions.messagesPost]: state => ({ ...state, loading: true }),
  },
  initialState,
);

export const sagas = {
  *doGetMessages() {
    while (true) {
      const action = yield take(actions.messagesRequest);
      const { id } = action.payload;
      try {
        const getUser = yield select(authSelectors.getUser);
        const messages = yield call(
          [apiService, apiService.get],
          `salesapp/${id}`,
          'messages',
          getUser.signInUserSession.idToken.jwtToken,
        );

        console.log(454545454, messages);
        yield put(actions.setMessagesData(messages));
      } catch (e) {
        console.log(e);
      }
    }
  },

  *doPostMessages() {
    while (true) {
      const action = yield take(actions.messagesPost);
      const { id, params } = action.payload;
      try {
        console.log('messagesPostID', id);
        const getUser = yield select(authSelectors.getUser);
        const messages = yield call(
          [apiService, apiService.post],
          `salesapp/${id}`,
          'messages',
          getUser.signInUserSession.idToken.jwtToken,
          params,
        );
        yield take(actions.messagesRequest);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
