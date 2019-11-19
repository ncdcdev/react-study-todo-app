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
    list.splice(i, 1);
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
