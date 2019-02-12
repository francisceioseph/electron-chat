import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Icon, Menu } from 'antd';
import { withHandlers, compose } from 'recompose';
import './header.scss';

const { Header } = Layout;

const AppHeader = props => (
  <Header className="header" style={{ background: '#fff', padding: 0 }}>
    <h1>{props.title}</h1>
  </Header>
);

export default AppHeader;
