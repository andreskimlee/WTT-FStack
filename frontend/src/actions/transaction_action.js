import * as APIUtil from '../util/trans_util'

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS"

const receiveTrans = (transaction) => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction,
    }
}

const receiveAllTrans = (transactions) => {
    return {
        type: RECEIVE_TRANSACTIONS,
        transactions
    }
}

export const createTransaction = (userId) => dispatch => (
    APIUtil.createTrans(userId)
        .then(transaction => dispatch(receiveTrans(transaction)))
);

export const fetchAllTrans = (userId) => dispatch => (
    APIUtil.fetchAllTrans(userId).then(transactions => dispatch(receiveAllTrans(transactions)))
);