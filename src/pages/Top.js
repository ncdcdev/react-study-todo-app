import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Button,
  Menu,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import Add from '../components/Add';
import List from '../components/List';

const Wrapper = styled.div`
  background: #eee;
`;

const CardStyled = styled(Card)`
  margin: 15px;
`;

const Top = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [list, setList] = useState([]);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(list);
  return (
    <Wrapper>
      <h1>React Todo App</h1>
      <Add handleAdd={e => setList([...list, e])} />
      <CardStyled>
        <CardContent>
          <Typography variant="h5" component="h2">
            0.aaa
          </Typography>
          <Typography variant="body2" component="p">
            あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={console.log(333)}>
            削除
          </Button>
        </CardActions>
      </CardStyled>
      <List list={list} />

      {/*FIXME*/}
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default Top;
