import * as APIUtil from '../util/trans_util'

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";


const receiveTrans = (transaction) => ({
    type: RECEIVE_TRANSACTION,
    transaction
})

export const createTransaction = (userId) => dispatch => (
    APIUtil.createTrans(userId)
        .then(transaction => dispatch(receiveTrans(transaction)))
);