import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import {
  actions as authActions,
  selectors as authSelectors,
} from '@@/sales/redux/modules/common/authModule';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '@@/sales/redux/modules/channelsModule';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '@@/sales/redux/modules/messagesModule';
import styled from 'styled-components';
import Icon from '@@/storyBook/src/atoms/Icon';
import Card from '@@/storyBook/src/molecules/Card';
import mf_theme from '@@/storyBook/src/mf_theme';
import ChannelList from '@@/sales/src/components/ChannelList';
import GoogleMap from '@@/sales/src/components/GoogleMap';
import { Schedule } from '@@/storyBook/src/molecules/Schedule';
import Modal from '@@/sales/src/components/Modal';
import Account from '@@/sales/src/components/Account';
import MessageList from '@@/sales/src/components/MessageList';
import { InputTextArea } from '@@/storyBook/src/atoms/Input';
import { Button } from '@@/storyBook/src/atoms/Button';
import Typography from '@@/storyBook/src/atoms/Typography';
import scrollToBottom from '@@/sales/util/scrollToBottom';
import { generateFileName } from '@@/sales/util/messageConversion';
import Storage from '@@/api/common/storage';
import { poolData } from '@@/sales/services/setting';

let isMount = false;
const storage = new Storage(
  poolData.awsIdentityPoolId,
  poolData.awsProjectRegion,
  poolData.awsS3Bucket,
);

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: start;
`;

const Inner = styled.div`
  display: -webkit-box;
  width: 100%;
}
`;

const HeaderWrap = styled.div`
  height: 58px;
  position: fixed;
  width: 480px;
  background-color: ${mf_theme.color.inherit_5};
  top: 0;
  line-height: 58px;
  display: flex;
}
`;

const Left = styled(Wrapper.withComponent('div'))`
  min-height: 100vh;
  width: 270px;
  background-color: ${mf_theme.color.inherit_7};
  border-right: 1px solid ${mf_theme.color.inherit_7};
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const Center = styled(Wrapper.withComponent('div'))`
  height: 100vh;
  width: 480px;
  border-right: 1px solid ${mf_theme.color.inherit_7};
  display: flex;
  justify-content: start;
  flex-direction: column;
  padding-top: 58px;
  overflow-y: scroll;
`;

const Right = styled(Wrapper.withComponent('div'))`
  background-color: #fff;
  height: 100vh;
  width: calc(100% - 750px);
  border-right: 1px solid ${mf_theme.color.inherit_7};
  justify-content: start;
  flex-direction: column;
  overflow-y: scroll;
`;

const UserBox = styled.div`
  width: 100%;
  height: 208px;
  background-color: ${mf_theme.color.inherit_5};
`;

const InputWrap = styled.div`
  position: fixed;
  bottom: 0px;
  min-width: 450px;
  width: calc(100% - 750px);
  z-index: 1;
  background-color: #fff;
`;

const InputHeader = styled.div`
  background-color: ${mf_theme.color.inherit_5};
  border-top: 1px solid ${mf_theme.color.inherit_7};
  padding: 10px 12px;
`;

const InputBody = styled.div`
  padding: 10px;
`;

const User = props => {
  const [channelId, setChannelId] = useState('');
  const [postMessages, setPostMessages] = useState('');
  const [mapStatus, setMapStatus] = useState(false);
  const [is_modalSchedule, setIs_modalSchedule] = useState(false);
  const [fileSendError, setFileSendError] = useState('');
  const pathName = props.location.pathname;
  const channels = props.channels ? props.channels.data : [];
  const messages = props.messages ? props.messages.data : [];
  const currentChannelId = messages[0] && messages[0].channelId;

  console.log(postMessages);
  console.log(props.messages);

  const handleLogout = (id, password) => {
    props.doLogout();
  };

  const getChannels = () => {
    props.doGetChannels();
    console.log('getChannels');
  };

  const handlePostMessages = (id, params) => {
    props.doPostMessages(id, params);
    setPostMessages('');
  };

  const handlePlace = e => {
    setMapStatus(e);
  };

  const fileAttach = async e => {
    // 送信可能なファイルはpng, jpg, pdfのみ。それ以外は選択できないようにする。
    const { error, name, key, body, contentType } = generateFileName({
      target: e.currentTarget,
      accept: ['png', 'jpg', 'jpeg', 'pdf'],
    });

    console.log(error, name, key, body, contentType);
    if (error) {
      alert(error.message);
      return;
    }

    const { error: putError } = await storage.put(name, key, body, contentType);

    if (putError) {
      setFileSendError(`${name}を送信できませんでした。
        ${error.message}
      `);
      return;
    }

    await props.doPostMessages(currentChannelId, {
      file: {
        name,
        url: key,
      },
    });
  };

  useEffect(() => {
    if (!isMount) {
      getChannels();
      // マウント時
      isMount = true;
      return;
    }

    scrollToBottom('right');
    console.log('useEffect');
  }, [messages]);

  return (
    <div>
      <Modal open={mapStatus} handleClose={() => handlePlace(false)} maxWidth="xl" fullWidth={true}>
        <GoogleMap
          handlePlace={e => handlePlace(e)}
          channelId={currentChannelId}
          defaultCenter={{
            center: {
              lat: 59.95,
              lng: 30.33,
            },
          }}
        />
      </Modal>
      <Modal open={is_modalSchedule} handleClose={() => setIs_modalSchedule(false)} maxWidth="md">
        <Schedule
          title={'日程を選択'}
          width={'520px'}
          postSchedules={schedulesArr => {
            handlePostMessages(messages[0].channelId, {
              schedules: schedulesArr,
            });
          }}
          is_modal={e => setIs_modalSchedule(e)}
        />
      </Modal>
      <Wrapper>
        <Inner>
          <Left>
            <UserBox />
            <Link to={`/user/account`}>
              <Card
                isActive={pathName.indexOf('/user/account') != -1 && true}
                body="アカウント"
                leftText={
                  <Icon
                    style={{
                      marginRight: '16px',
                    }}
                    variant="account"
                    deviceType="PC"
                  />
                }
                rightText={<Icon variant="arrow" deviceType="PC" />}
                size="small"
              />
            </Link>
            <Link to={`/user/channel`}>
              <Card
                onClick={() => getChannels()}
                isActive={pathName.indexOf('/user/channel') != -1 && true}
                body="会話一覧"
                leftText={
                  <Icon
                    style={{
                      marginRight: '16px',
                    }}
                    variant="conversation"
                    deviceType="PC"
                  />
                }
                rightText={<Icon variant="arrow" deviceType="PC" />}
                size="small"
              />
            </Link>
            <Card
              onClick={() => handleLogout()}
              body="ログアウト"
              leftText={
                <Icon
                  style={{
                    marginRight: '16px',
                  }}
                  variant="logout"
                  deviceType="PC"
                />
              }
              rightText={<Icon variant="arrow" deviceType="PC" />}
              size="small"
            />
          </Left>
          <Center>
            <HeaderWrap>
              <Typography textType="h3" text="チャンネル一覧" />
              <Icon
                hover
                style={{
                  marginRight: '19px',
                }}
                variant="filter"
                deviceType="PC"
              />
              <Icon hover variant="search" deviceType="PC" />
            </HeaderWrap>
            {pathName.indexOf('/user/channel') !== -1 ? (
              <ChannelList lists={channels} />
            ) : pathName.indexOf('/user/account') !== -1 ? (
              <Account />
            ) : null}
          </Center>
          <Right id="right">
            {pathName.indexOf(`/user/channel/`) !== -1 ? (
              <div>
                <MessageList lists={messages} />
                <InputWrap>
                  <InputHeader className="l_flex l_flex--left ">
                    <label htmlFor="fileUpload">
                      <Icon
                        hover
                        style={{
                          marginRight: '19px',
                        }}
                        variant="clip"
                        deviceType="PC"
                      />
                      <input
                        className="hidden"
                        id="fileUpload"
                        type="file"
                        accept=".jpg,.pdf,.png"
                        onChange={e => fileAttach(e)}
                      />
                    </label>
                    <Icon
                      hover
                      style={{
                        marginRight: '19px',
                      }}
                      variant="camera"
                      deviceType="PC"
                    />
                    <Icon
                      hover
                      style={{
                        marginRight: '19px',
                      }}
                      variant="calendar"
                      deviceType="PC"
                      onClick={() => setIs_modalSchedule(true)}
                    />
                    <Icon
                      hover
                      style={{
                        marginRight: '19px',
                      }}
                      variant="place"
                      deviceType="PC"
                      onClick={() => handlePlace(true)}
                    />
                    <Icon
                      hover
                      style={{
                        marginRight: '19px',
                      }}
                      variant="note"
                      deviceType="PC"
                    />
                  </InputHeader>
                  <InputBody className="l_flex">
                    <InputTextArea
                      err={false}
                      name="postMessages"
                      onChange={e => setPostMessages(e.target.value)}
                      value={postMessages}
                      style={{
                        width: '85%',
                        marginRight: '10px',
                        minHeight: '100px',
                      }}
                    />
                    <Button
                      text="送信"
                      onClick={() =>
                        handlePostMessages(messages[0].channelId, {
                          body: postMessages,
                          sender: {
                            dateTime: moment().format(),
                          },
                        })
                      }
                      variant="contained"
                      size="small"
                      color="secondary"
                    />
                  </InputBody>
                </InputWrap>
              </div>
            ) : pathName == '/user/account' ? (
              <Account />
            ) : null}
          </Right>
        </Inner>
      </Wrapper>
    </div>
  );
};

export default withRouter(
  connect(
    state => ({
      user: authSelectors.getUser(state.authReducer),
      channels: channelsSelectors.getChannels(state.channelsReducer),
      messages: messagesSelectors.getMessages(state.messagesReducer),
    }),
    {
      checkLogin: () => authActions.checkLoginRequest(),
      doLogout: () => authActions.logout(),
      doGetChannels: () => channelsActions.setChannelsData(),
      doPostMessages: (id, params) => messagesActions.messagesPost(id, params),
      doGetMessages: id => messagesActions.messagesRequest(id),
    },
  )(User),
);
