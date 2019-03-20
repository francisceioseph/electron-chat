import React from 'react';
import PropTypes from 'prop-types';
import t from 'typy';

import { List, Avatar } from 'antd';

const makeInitials = (name) => {
  const tokens = name.split(' ');

  const firstLetter = tokens[0][0];
  const sencondLetter = tokens.length > 0 ? tokens[tokens.length - 1][0] : tokens[0][1];

  return firstLetter + sencondLetter;
};

const getLastMessageContent = (messages) => {
  const lastMessage = messages[messages.length - 1] || { content: '', attachments: []};
  const content = lastMessage.content || '';
  const attachments = lastMessage.attachments || [];

  if (content) {
    return content;
  } else if (attachments.length >= 1) {
    const fileToken = attachments.length > 1 ? 'arquivos' : 'arquivo';
    return `${attachments.length} ${fileToken} em anexo`;
  } else {
    return "";
  }

  return lastMessage.content;
};

const ConversationListItem = (props) => {
  const { conversation, onSelect } = props;
  const receiver = conversation.users.find(u => u.id !== props.user.id) || props.user;
  const receiverName = t(receiver, 'profile.personal_datum.full_name').safeString;

  return (
    <List.Item onClick={onSelect} style={{ cursor: 'pointer' }}>
      <List.Item.Meta
        avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{makeInitials(receiverName)}</Avatar>}
        title={<strong>{receiverName}</strong>}
        description={getLastMessageContent(conversation.messages)}
      />
    </List.Item>
  );
};

ConversationListItem.propTypes = {
  conversation : PropTypes.instanceOf(Object).isRequired,
  onSelect     : PropTypes.func.isRequired
};

export default ConversationListItem;
