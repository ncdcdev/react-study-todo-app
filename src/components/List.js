import React, { useState } from 'react';
import { Button } from '@material-ui/core';

let style = {
  maxWidth: '700px',
};

let btn = {
  cursor: 'pointer',
};

const List = props => {
  const { list } = props;
  return (
    <ul className="siimple-list">
      {list.map((n, i) => (
        <li className="siimple-list-item siimple--bg-white" style={style}>
          {n.title}
          <Button variant="contained" color="secondary" onClick={console.log(333)}>
            削除
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default List;
