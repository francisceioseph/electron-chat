// @flow

import * as React from 'react';
import { List, Divider, Empty } from 'antd';

import ConversationListItem from './conversation-list-item.component';
import NewConversationForm from './conversation-form.component';
import CurrentUserDisplay from '../user-item/user-item.component';
import { ActionButtons } from '../action-buttons';

import './conversation-list.less';

type Props = {
  conversations: Array<Object>,
  user: Object,
  users: Array<Object>,
  onSelect: Function,
  createConversation: Function,
  handleLogoutClick: Function
};

const ConversationList = (props: Props) => {
  const hasConversations = props.conversations.length > 0;

  return (
    <div className="conversation-list-container">
      <CurrentUserDisplay user={props.user} />
      <Divider />
      <NewConversationForm user={props.user} users={props.users} createConversation={props.createConversation} />
      {hasConversations && (
        <div className="conversation-list">
          <List
            itemLayout="horizontal"
            dataSource={props.conversations}
            rowKey={conversation => `${conversation.id}`}
            renderItem={conversation => (
              <ConversationListItem
                conversation={conversation}
                onSelect={() => props.onSelect(conversation.id)}
                user={props.user}
              />
            )}
          />
        </div>
      )}

      {!hasConversations && <Empty description="Ainda não há nenhuma mensagem" />}
      <ActionButtons handleLogoutClick={props.handleLogoutClick} />
    </div>
  );
};

export default ConversationList;
