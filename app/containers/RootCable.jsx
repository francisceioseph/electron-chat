// @flow

import * as React from 'react';
import t from 'typy';

import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';

import { getActionCableConsumer } from '../utils/action-cable.service';

type Props = {
  children: Object,
  token: string
};

const mapStateToProps = ({ login }) => ({
  token: t(login, 'credentials.token').safeString
});

const RootCable = (props: Props) => {
  if (props.token) {
    const cableConsumer = getActionCableConsumer(props.token);
    return <ActionCableProvider cable={cableConsumer}>{props.children}</ActionCableProvider>;
  }

  return <div>{props.children}</div>;
};

export default connect(
  mapStateToProps,
  null
)(RootCable);
