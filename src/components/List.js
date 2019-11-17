import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

let style = {
  maxWidth: '700px',
};

let btn = {
  cursor: 'pointer',
};

const List = props => {
  const { list } = props;
  return (
    <div className="siimple-list">
      {list.map((n, i) => (
        <Card>
          <CardContent>
            <Typography color="textSecondary">{i + 1}</Typography>
            <Typography variant="h5" component="h2">
              {n.title}
            </Typography>

            <Typography variant="body2" component="p">
              {n.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={console.log(333)}>
              削除
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default List;
