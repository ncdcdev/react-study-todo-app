import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Top from './Top';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Top} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
