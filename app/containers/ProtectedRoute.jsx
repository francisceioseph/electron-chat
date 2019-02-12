/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { PageLayout } from './layouts';
const mapStateToProps = ({ login }) => ({
  authenticated: !!login.credentials.token
});

const mapDispatchToProps = {};

const ProtectedRoute = ({ authenticated, ...props }) => (
  <React.Fragment>
    {authenticated ? (
      <PageLayout {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    )}
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
