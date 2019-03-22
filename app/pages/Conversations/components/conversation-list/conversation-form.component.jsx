// @flow

import * as React from 'react';
import deburr from 'lodash/deburr';

import { AutoComplete } from 'antd';
import {
  compose, withHandlers, withState, lifecycle
} from 'recompose';

import SugestSelector from '../../../../components/SugestSelector';
import * as WebAPI from '../../../../utils/api.service';

type User = {
  id: number,
  full_name: string
};

type Props = {
  user: User,
  users: Array<User>,
  userList: Array<User>,
  handleOnSelect: Function,
  handleOnSearch: Function,
  createConversation: Function,
  setUserList: Function
};

const styles = {
  autocomplete: {
    width        : '100%',
    marginBottom : '8px'
  }
};

const handleOnSelect = (props: Props) => async (value: string) => {
  props.createConversation(parseInt(value));
};

const withFormHandlers = withHandlers({
  handleOnSelect,
});

const withUserListState = withState('userList', 'setUserList', []);

const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.setUserList(this.props.users.filter(user => user.id != this.props.user.id));
  }
});

const NewConversationForm = (props: Props) => (
  <div className="conversation-form">
    <label>Nova Conversa</label>

    <SugestSelector 
      style={styles.autocomplete} 
      onSelect={props.handleOnSelect} 
      options={props.userList}
      valueName="id"
      labelName="full_name" 
      idName="id"
      placeholder="Selecione um usuário"
      />
  </div>
);

const ConversationFormComponent = compose(
  withUserListState,
  withLifecycle,
  withFormHandlers
)(NewConversationForm);

export default ConversationFormComponent;
