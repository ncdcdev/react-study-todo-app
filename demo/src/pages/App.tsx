import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as redux from 'redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import configureStore from '@@/sales/redux/configureStore';
import Wrapper from './Wrapper';
import Login from './Login';
import User from './User';
import NotFound from './NotFound';
import ChannelList from '@@/sales/src/components/ChannelList';

const store = configureStore();

store.subscribe(() => {
  console.log('subscribeStore', store.getState());
  console.log(location.pathname);
});

export default () => (
  <Provider store={store}>
    <Router>
      <Wrapper>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              store.getState().authReducer.user ? (
                <Redirect to="/user/channel" component={User} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            exact
            path={['/user', '/user/channel', '/user/channel/:id', '/user/account']}
            render={() =>
              !store.getState().authReducer.user ? <Redirect to="/" component={Login} /> : <User />
            }
          />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </Router>
  </Provider>
);
