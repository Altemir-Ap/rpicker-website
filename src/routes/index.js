import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} isPrivate />
      <Route path="/amount" component={Home} isPrivate />
      <Route path="/newuser" component={Home} isPrivate />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
