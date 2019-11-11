import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Input from '@@/storyBook/src/atoms/Input';
import Typography from '@@/storyBook/src/atoms/Typography';
import { Button } from '@@/storyBook/src/atoms/Button';
import {
  actions as authActions,
  selectors as authSelectors,
} from '@@/sales/redux/modules/common/authModule';
import mf_theme from '@@/storyBook/src/mf_theme';

const WrappCenter = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  min-height: 448px;
  max-width: 480px;
  border: 1px solid #e5ddcb;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 64px 95px;
  text-align: center;
`;

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>bbbb</p>;
  }
}

export default withRouter(
  connect(
    state => ({
      user: authSelectors.getUser(state.authReducer),
      errorMessage: authSelectors.loggedErr(state.authReducer),
    }),
    {
      doLogin: (id, password) => authActions.loginRequest(id, password),
      checkLogin: () => authActions.checkLoginRequest(),
      doLogout: () => authActions.logout(),
    },
  )(Account),
);
