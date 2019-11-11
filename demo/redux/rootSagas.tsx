import { all, fork } from 'redux-saga/effects';
import { sagas as authSagas } from './modules/common/authModule';
import { sagas as channelsSagas } from './modules/channelsModule';
import { sagas as messagesSagas } from './modules/messagesModule';

export default function* rootSaga() {
  yield all([
    fork(authSagas.checkLogin),
    fork(authSagas.doLogin),
    fork(authSagas.doLogout),
    fork(channelsSagas.doGetChannels),
    fork(messagesSagas.doGetMessages),
    fork(messagesSagas.doPostMessages),
  ]);
}
