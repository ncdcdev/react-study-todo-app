import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import NotFound from './NotFound';
import Top from './Top';

export default () => (
  <Router>
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route component={NotFound} />
      </Switch>
    </Wrapper>
  </Router>
);
