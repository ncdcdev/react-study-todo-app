import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import {
  actions as authActions,
  selectors as authSelectors,
} from '@@/sales/redux/modules/common/authModule';
import {
  existsStorageKey,
  removeAllItem,
  setItem,
  getItem,
} from '@@/sales/localStorage/LocalStorageService';
import User from './User';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.checkLogin();
  }

  render() {
    /*FIXME*/
    console.log('warapper', this.props);
    console.log('warapper_USER', this.props.user);
    const userPagePath = this.props.location.pathname;
    console.log(this.props);

    return this.props.user ? (
      <div>
        <Redirect to={userPagePath} component={User} />

        <div>{this.props.children}</div>
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: authSelectors.getUser(state.authReducer),
    }),
    {
      checkLogin: () => authActions.checkLoginRequest(),
    },
  )(Wrapper),
);
