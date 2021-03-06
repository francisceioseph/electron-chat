import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { ActionCableConsumer } from 'react-actioncable-provider';

import * as WebAPI from '../../../utils/api.service';
import Cable from './cable/cable.component';
import ConversationList from './conversation-list/conversation-list.component';
import MessagesList from './message-list/messages-list.component';
import './conversations-component.less';

const withLifecycle = lifecycle({
  async componentDidMount() {
    try {
      this.props.showPageLoader();
      const responses = await Promise.all([WebAPI.getChatUsers(), WebAPI.getConversations()]);

      this.props.loadUserList(responses[0]);
      this.props.loadConversations(responses[1]);
    } catch (error) {
      console.log(error);
    } finally {
      this.props.hidePageLoader();
    }
  },

  componentWillUnmount() {}
});

const handleCreateNewConversation = props => async (userId) => {
  const conversation = props.conversations.find(conversation => conversation.users.find(user => user.id == userId));

  if (conversation) {
    props.selectConversation(conversation.id);
  } else {
    try {
      props.showPageLoader();
      const response = await WebAPI.postNewConversation({ receiver_id: userId });
      const { data: conversation } = response;
      
      props.addConversation(conversation);
    } catch (e) {
      console.log(e);
    } finally {
      props.hidePageLoader();
    }
  }
};

const handleLogoutClick = props => () => props.clearCredentials();

const handleReceivedConversation = props => (response) => {
};

const handleReceivedMessage = props => (response) => {
  const { message } = response;
  props.addNewMessage(message);
};

const handleSelectConversation = props => (conversationId) => {
  props.selectConversation(conversationId);
};

const withConversationHandlers = withHandlers({
  handleReceivedConversation,
  handleReceivedMessage,
  handleSelectConversation,
  handleCreateNewConversation,
  handleLogoutClick
});

const ConversationsComponent = props => (
  <div className="conversations">
    <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={props.handleReceivedConversation} />
    {props.conversations.length ? (
      <Cable conversations={props.conversations} handleReceivedMessage={props.handleReceivedMessage} />
    ) : null}

    <div className="row">
      <div className="col">
        <ConversationList
          user={props.user}
          users={props.users}
          conversations={props.conversations}
          currentConversation={props.conversation}
          onSelect={props.handleSelectConversation}
          createConversation={props.handleCreateNewConversation}
          handleLogoutClick={props.handleLogoutClick}
        />
      </div>
      <div className="col messages-list">
        <MessagesList conversation={props.conversation} user={props.user} />
      </div>
    </div>
  </div>
);

export default compose(
  withLifecycle,
  withConversationHandlers
)(ConversationsComponent);
