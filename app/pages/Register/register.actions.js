import { createAction } from 'redux-actions';

export const setRegisterError = createAction('SET_REGISTER_ERROR', error => error);
