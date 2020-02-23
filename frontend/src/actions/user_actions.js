import * as APIUtil from '../util/users_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});


export const fetchUser = (userId) => dispatch => (
  APIUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
);

export const updateUser = (user) => dispatch => (
  APIUtil.updateUser(user)
    .then(user => dispatch(receiveUser(user)))
);