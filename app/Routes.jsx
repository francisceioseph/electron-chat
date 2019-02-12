import React from 'react';
import { Switch } from 'react-router';

import ProtectedRoute from './containers/ProtectedRoute';
import NoAuthRoute from './containers/NoAuthRoute';
import App from './containers/App';

import { LoginPage } from './pages/Login';
import { Conversations } from './pages/Conversations';

export default () => (
  <App>
    <Switch>
      <NoAuthRoute exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Conversations} />
    </Switch>
  </App>
);
