import React from 'react';

import { Layout } from 'antd';
import './header.scss';

const { Header } = Layout;

const AppHeader = props => (
  <Header className="header" style={{ background: 'transparent', padding: 0 }}>
    <h1>{props.title}</h1>
  </Header>
);

export default AppHeader;
