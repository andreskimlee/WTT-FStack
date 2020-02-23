import { merge } from 'lodash'

import {
    RECEIVE_TRANSACTIONS,
    RECEIVE_TRANSACTION
} from '../actions/transaction_action';

const TransactionReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TRANSACTIONS:
            return merge({}, state, action.transactions.data)
        case RECEIVE_TRANSACTION:
            return merge({}, state, { [Object.values(state).length]: action.transaction.data.transaction })
        default:
            return state;
    }
};

export default TransactionReducer;