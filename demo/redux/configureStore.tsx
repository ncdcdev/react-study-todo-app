import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';
import rootReducers from './rootReducers';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(rootReducers(), applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
};
