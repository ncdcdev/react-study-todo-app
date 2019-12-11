import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

const Wrapper = styled.div`
  background: #eee;
  padding: 20px;
`;

const Top = () => {
  return (
    <Wrapper>
      <Typography variant="h1" component="h">
        React Todo App
      </Typography>
    </Wrapper>
  );
};

export default Top;
