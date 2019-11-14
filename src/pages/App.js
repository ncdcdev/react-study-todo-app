import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import NotFound from './NotFound';
import Add from './Add';
import List from './List';

export default () => (
  <Router>
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Add} />
        <Route exact path="/list" component={List} />
        <Route component={NotFound} />
      </Switch>
    </Wrapper>
  </Router>
);
