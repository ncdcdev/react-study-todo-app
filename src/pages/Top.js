import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import Add from '../components/Add';
import List from '../components/List';

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
    <div>
      <h1>React Todo App</h1>
      <Add handleAdd={e => setList([...list, e])} />
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
    </div>
  );
};

export default Top;
