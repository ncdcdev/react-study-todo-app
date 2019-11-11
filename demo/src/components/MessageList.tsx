import React from 'react';
import styled from 'styled-components';
import mf_theme from '@@/storyBook/src/mf_theme';
import messageConversion from '@@/sales/util/messageConversion';
import { Message } from '@@/storyBook/src/molecules/Message';

const Wrapper = styled.div`
  background-color: #fff
  width: 100%;
  display: block;
  padding: 30px;
  padding-bottom: 200px;
`;

const MessageList = props => {
  console.log('lists[]', props.lists);
  const listItems = props.lists.map(list => {
    console.log('list', list);
    if (list.isDeleted == true || !list) return false;
    return (
      <Message
        key={list.messageId}
        item={messageConversion(list)}
        direction={list.sender.isCustomer ? 'left' : 'right'}
        avatar={list.sender.isCustomer && list.sender.name.slice(0, 1)}
        dateTime={list.sender.dateTime}
      />
    );
  });
  return <Wrapper>{listItems}</Wrapper>;
};

export default MessageList;
