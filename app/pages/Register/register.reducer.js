import { handleActions } from 'redux-actions';
import {
  setRegisterError,
} from './register.actions';

export const registerDefaultState = {
  registerError: null
};

const handleSetRegisterError = (state, action) => ({
  ...state,
  registerError: action.payload
});

export default handleActions(
  {
    [setRegisterError]: handleSetRegisterError
  },
  registerDefaultState
);
