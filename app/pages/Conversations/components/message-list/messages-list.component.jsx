import React from 'react';
import PropTypes from 'prop-types';
import { Empty, List } from 'antd';

import Header from '../../../../components/Header/header.component';
import Message from '../message-bubble/message-bubble.component';
import MessageForm from './message-form.component';

import './messages-list.component.less';

const endsSequence = (next, current) => {
  if (next) {
    // let nextMoment = moment(next.timestamp);
    // let nextDuration = moment.duration(nextMoment.diff(currentMoment));
    // nextBySameAuthor = next.author === current.author;

    // if (nextBySameAuthor && nextDuration.as('hours') < 1) {
    //   endsSequence = false;
    // }

    return next.user_id !== current.user_id;
  }

  return true;
};

const startSequence = (previous, current) => {
  if (previous) {
    // let previousMoment = moment(previous.timestamp);
    // let previousDuration = moment.duration(currentMoment.diff(previousMoment));
    // prevBySameAuthor = previous.author === current.author;

    // if (prevBySameAuthor && previousDuration.as('hours') < 1) {
    //   startsSequence = false;
    // }

    // if (previousDuration.as('hours') < 1) {
    //   showTimestamp = false;
    // }

    return previous.user_id !== current.user_id;
  }

  return true;
};

const getReceiver = (conversation, user) =>  conversation.users.find(u => u.id !== user.id) || user;

const belongsToCurrentUser = (message, user) => message.user_id === user.id;

const renderMessages = (conversation, messages, user) => (
  <div className="message-list-content">
    <Header title={getReceiver(conversation, user).profile.personal_datum.full_name} />
    <List
      style={{ flexGrow: 1 }}
      dataSource={messages}
      renderItem={(message, index) => {
        const previous = messages[index - 1];
        const next = messages[index + 1];

        const messageStartsSequence = startSequence(previous, message);
        const messageEndsSequence = endsSequence(next, message);

        return (
          <Message
            key={message.id}
            isMine={belongsToCurrentUser(message, user)}
            startsSequence={messageStartsSequence}
            endsSequence={messageEndsSequence}
            showTimestamp={false}
            data={message}
          />
        );
      }}
    />
  </div>
);

const MessagesList = ({ conversation, user }) => {
  const { messages } = conversation;
  const hasMessages = messages.length > 0;

  return (
    <div className="message-list-container">
      {hasMessages && renderMessages(conversation, messages, user)}

      {!hasMessages && (
        <div className="empty-container">
          <Empty description="Ainda não há nenhuma mensagem" />
        </div>
      )}
      <MessageForm conversationId={conversation.id} user={user} />
    </div>
  );
};

MessagesList.propTypes = {
  conversation : PropTypes.instanceOf(Object),
  user         : PropTypes.instanceOf(Object).isRequired
};

MessagesList.defaultProps = {
  conversation: {
    messages: []
  }
};

export default MessagesList;
