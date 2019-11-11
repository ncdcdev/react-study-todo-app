import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { InputText } from '@@/storyBook/src/atoms/Input';
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
  max-height: 448px;
  max-width: 480px;
  border: 1px solid #e5ddcb;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 64px 95px;
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'test-sales1@ncdc.co.jp',
      password: 'R89Y!jZt8SSVys23!',
    };
  }

  handledoLogin(id, password) {
    this.props.doLogin(id, password);
  }
  handleSubmit_2() {
    this.props.checkLogin();
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <WrappCenter>
        <Typography
          textType="h1"
          size="large_xx"
          text="ログイン"
          style={{
            marginBottom: '40px',
            lineHeight: '22px',
          }}
        />
        <div
          style={{
            textAlign: 'left',
            marginBottom: '33px',
          }}
        >
          <Typography
            textType="h2"
            size="large"
            text="ID"
            style={{
              marginBottom: '10px',
            }}
          />
          <InputText
            err={this.props.errorMessage}
            name="id"
            onChange={e => this.handleChange(e)}
            type="text"
            size="medium"
            value={this.state.id}
          />
        </div>
        <div
          style={{
            textAlign: 'left',
            marginBottom: !this.props.errorMessage ? '40px' : '5px',
          }}
        >
          <Typography
            textType="h2"
            size="large"
            text="パスワード"
            style={{
              marginBottom: '10px',
            }}
          />
          <InputText
            err={this.props.errorMessage}
            name="password"
            onChange={e => this.handleChange(e)}
            type="text"
            size="medium"
            value={this.state.password}
          />
        </div>

        {(() => {
          if (this.props.errorMessage) {
            return (
              <Typography
                textType="Text"
                text="idまたはパスワードが違います。"
                size="medium"
                style={{
                  marginBottom: '10px',
                  color: mf_theme.color.danger_1,
                }}
              />
            );
          }
        })()}
        <Button
          text="ログイン"
          onClick={() => this.handledoLogin(this.state.id, this.state.password)}
          variant="contained"
          size="medium"
          color="primary"
        />
        <Button
          text="チェック"
          onClick={() => this.handleSubmit_2()}
          variant="contained"
          size="medium"
          color="primary"
        />
      </WrappCenter>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      errorMessage: authSelectors.loggedErr(state.authReducer),
    }),
    {
      doLogin: (id, password) => authActions.loginRequest(id, password),
      checkLogin: () => authActions.checkLoginRequest(),
    },
  )(Login),
);
