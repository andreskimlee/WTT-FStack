import { merge } from 'lodash'

import {
  RECEIVE_USER,
} from '../actions/user_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions'

import {
  RECEIVE_TRANSACTION
} from '../actions/transaction_action'

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, action.currentUser, state)
    case RECEIVE_USER:
      return action.user.data
    case RECEIVE_TRANSACTION:
      return action.transaction.data
    default:
      return state;
  }
};

export default UsersReducer;