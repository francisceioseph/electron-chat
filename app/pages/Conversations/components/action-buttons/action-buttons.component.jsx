// @flow

import * as React from 'react';
import { Button, Tooltip } from 'antd';

type Props = {
  handleLogoutClick: Function
};

const ButtonGroup = Button.Group;

const ActionButtons = (props: Props) => (
  <div>
    <ButtonGroup>
      <Tooltip title="Nova Conversa">
        <Button icon="user-add" />
      </Tooltip>

      <Tooltip title="Sair">
        <Button icon="logout" onClick={props.handleLogoutClick} />
      </Tooltip>
    </ButtonGroup>
  </div>
);

export default ActionButtons;
