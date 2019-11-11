import { call, put, take, select } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import ApiService from '@@/api/common/ApiService';
import {
  setItem as storageSetItem,
  getItem as storageGetItem,
  removeItem as storageRemoveItem,
} from '@@/sales/localStorage/LocalStorageService';
import {
  actions as authActions,
  selectors as authSelectors,
} from '@@/sales/redux/modules/common/authModule';

const apiService = new ApiService();

const initialState = {
  loading: false,
  errorMessage: null,
  channels: null,
};

export const selectors = {
  getChannels: state => state.channels,
  channelsErr: state => state.errorMessage,
};

export const actions = createActions({
  setChannelsData: channels => ({ channels }),
});

export const reducer = handleActions(
  {
    [actions.setChannelsData]: (state, { payload }) => ({
      ...state,
      channels: payload.channels,
    }),
  },
  initialState,
);

export const sagas = {
  *doGetChannels() {
    while (true) {
      yield take(actions.setChannelsData);
      try {
        const getUser = yield select(authSelectors.getUser);
        const channels = yield call(
          [apiService, apiService.get],
          'salesapp',
          'channels',
          getUser.signInUserSession.idToken.jwtToken,
        );
        yield put(actions.setChannelsData(channels));
      } catch (e) {
        console.log(e);
      }
    }
  },
};
