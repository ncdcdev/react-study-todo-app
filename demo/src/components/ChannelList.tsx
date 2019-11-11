import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Card from '@@/storyBook/src/molecules/Card';
import Circle from '@@/storyBook/src/atoms/Circle';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '@@/sales/redux/modules/messagesModule';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '@@/sales/redux/modules/channelsModule';

import { getItem as storageGetItem } from '@@/sales/localStorage/LocalStorageService';

import mf_theme from '@@/storyBook/src/mf_theme';

let isMount = false;

const ChannelList = props => {
  const getMessages = id => {
    console.log('id', id);
    console.log('props.history', props.history);
    props.doGetMessages(id);
    props.history.push(`/user/channel/${id}`);
  };

  const currentId = props.location.pathname.split('/');

  return props.lists.map(list => (
    <Card
      isActive={list.channelId == currentId[3] && true}
      key={list.channelId}
      body={list.channelName}
      leftText={
        <Circle
          size="small"
          bgColor="#fff"
          color={mf_theme.color.typography_2}
          margin="0 16px 0 0"
          text={list.channelName.slice(0, 1)}
        />
      }
      size="medium"
      onClick={() => getMessages(list.channelId)}
    />
  ));
};

export default withRouter(
  connect(
    state => ({
      message: messagesSelectors.getMessages(state.messagesReducer),
      channels: channelsSelectors.getChannels(state.channelsReducer),
    }),
    {
      doGetMessages: id => messagesActions.messagesRequest(id),
    },
  )(ChannelList),
);
