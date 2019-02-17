// @flow

import * as React from 'react';
import { Avatar } from 'antd';

import './user-item.component.less';

type Props = {
  user: Object
};

const UserItem = (props: Props) => {
  const { user } = props;

  return (
    <div className="container">
      <div className="avatar">
        <Avatar size={48} icon="user" />
      </div>
      <div className="user-data">
        <h3>{user.profile.personal_datum.full_name}</h3>
      </div>
    </div>
  );
};

export default UserItem;
