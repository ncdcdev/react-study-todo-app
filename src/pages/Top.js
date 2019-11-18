import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';
import Add from '../components/Add';
import List from '../components/List';

const Wrapper = styled.div`
  background: #eee;
  padding: 20px;
`;

const Top = () => {
  const [list, setList] = useState([]);

  const handleRemove = i => {
    // todo配列からi番目から1つ目のデータを除外
    console.log('i', i);
    list.splice(i, 1);

    console.log('list.splice', list);
    // setStateでtodo配列を上書き
    setList([...list]);
  };

  console.log(list);
  return (
    <Wrapper>
      <Typography variant="h1" component="h">
        React Todo App
      </Typography>
      <Add handleAdd={e => setList([...list, e])} />
      <List list={list} handleRemove={i => handleRemove(i)} />
    </Wrapper>
  );
};

export default Top;
