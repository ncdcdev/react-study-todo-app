import React from 'react';
import { Button } from '@material-ui/core';

let style = {
  maxWidth: '700px',
};

let btn = {
  cursor: 'pointer',
};

const List = props => (
  <ul className="siimple-list">
    <li className="siimple-list-item siimple--bg-white" style={style}>
      Item 1{' '}
      <Button variant="contained" color="secondary" onClick={console.log(333)}>
        削除
      </Button>
    </li>
    <li className="siimple-list-item siimple--bg-white" style={style}>
      Item 2{' '}
      <Button variant="contained" color="secondary" onClick={console.log(333)}>
        削除
      </Button>
    </li>
    <li className="siimple-list-item siimple--bg-white" style={style}>
      Item 3{' '}
      <Button variant="contained" color="secondary" onClick={console.log(333)}>
        削除
      </Button>
    </li>
  </ul>
);

export default List;
