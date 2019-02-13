import React from 'react';
import { List, Divider, Empty } from 'antd';

import ConversationListItem from './conversation-list-item.component';
import NewConversationForm from './conversation-form.component';
import CurrentUserDisplay from '../user-item/user-item.component';

const styles = {
  container: {
    paddingRight: '16px'
  }
};

const ConversationList = (props) => {
  const hasConversations = props.conversations.length > 0;

  return (
    <div style={styles.container}>
      <CurrentUserDisplay user={props.user} />
      <Divider />
      <NewConversationForm users={props.users} createConversation={props.createConversation} />
      {hasConversations && (
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
      )}

      {!hasConversations && <Empty description="Ainda não há nenhuma mensagem" />}
    </div>
  );
};

export default ConversationList;
