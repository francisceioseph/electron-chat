// @flow
import * as React from 'react';
import * as ptBr from 'antd/lib/locale-provider/pt_BR';
import * as PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LocaleProvider } from 'antd';

import Routes from '../Routes';
import RootCable from './RootCable';

export default function Root(props) {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <RootCable>
        <LocaleProvider locale={ptBr}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </LocaleProvider>
      </RootCable>
    </Provider>
  );
}

Root.propTypes = {
  store   : PropTypes.instanceOf(Object).isRequired,
  history : PropTypes.instanceOf(Object).isRequired
};
