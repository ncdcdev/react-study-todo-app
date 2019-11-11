import { call, put, take, select } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import auth from '@@/api/common/auth';
import { poolData } from '@@/sales/services/setting';
import {
  setItem as storageSetItem,
  getItem as storageGetItem,
  removeItem as storageRemoveItem,
  refAllItem,
} from '@@/sales/localStorage/LocalStorageService';

const authentication = new auth(
  poolData.awsProjectRegion,
  poolData.awsUserPoolsId,
  poolData.awsUserPoolsWebClientId,
  poolData.endpointPath,
);

const initialState = {
  loading: false,
  errorMessage: null,
  user: null,
};

export const selectors = {
  getUser: state => (state.user ? state.user : state.authReducer ? state.authReducer.user : null),
  loggedErr: state => state.errorMessage,
};

export const actions = createActions({
  setUserData: user => ({ user }),
  checkLoginRequest: () => {},
  checkLoginSuccess: () => {},
  checkLoginFailure: errorMessage => ({ errorMessage }),
  loginRequest: (id, password) => ({ id, password }),
  loginSuccess: (accessToken, localKey) => ({ accessToken, localKey }),
  loginFailure: errorMessage => ({ errorMessage }),
  logout: () => {},
});

export const reducer = handleActions(
  {
    [actions.setUserData]: (state, { payload }) => ({
      ...state,
      user: payload.user,
    }),
    [actions.checkLoginRequest]: state => ({ ...state }),
    [actions.checkLoginFailure]: state => ({ ...state }),
    [actions.loginRequest]: state => ({ ...state, loading: true }),
    [actions.loginSuccess]: (state, { payload }) => ({
      ...state,
      accessToken: payload.accessToken,
      localKey: payload.localKey,
    }),
    [actions.loginFailure]: (state, { payload }) => ({
      ...state,
      errorMessage: payload.errorMessage,
    }),
    [actions.logout]: state => ({
      ...state,
    }),
  },
  initialState,
);

export const sagas = {
  *checkLogin() {
    while (true) {
      yield take(actions.checkLoginRequest);
      try {
        const user = yield call(authentication.checkUser);
        yield put(actions.setUserData(user));
        const aaagetUser = yield select(selectors.getUser);
      } catch (e) {
        yield put(actions.loginFailure(e));
        console.log(e);
      }
    }
  },
  *doLogin() {
    while (true) {
      const action = yield take(actions.loginRequest);
      const { id, password } = action.payload;

      try {
        const user = yield call(authentication.signIn, id, password);
        yield put(actions.loginFailure(null));
        yield put(actions.setUserData(user));
        console.log('dologin____', user);
      } catch (e) {
        yield put(actions.loginFailure(e));
      }
    }
  },
  *doLogout() {
    while (true) {
      yield take(actions.logout);
      try {
        yield call(authentication.signOut);
        console.log('logout___');
        yield put(actions.setUserData(null));
        console.log('logout___2');
      } catch (e) {
        yield put(actions.loginFailure(e));
      }
    }
  },
};
