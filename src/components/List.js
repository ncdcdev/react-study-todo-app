import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div``;
const CardStyled = styled(Card)`
  margin: 15px;
`;

const List = props => {
  const { list } = props;
  return (
    <Wrapper>
      {list.map((n, i) => (
        <CardStyled>
          <CardContent>
            <Typography variant="h5" component="h2">
              {i + 1}.{n.title}
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
        </CardStyled>
      ))}
    </Wrapper>
  );
};

export default List;
