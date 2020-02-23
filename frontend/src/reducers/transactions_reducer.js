import { merge } from 'lodash'

import {
    RECEIVE_TRANSACTIONS,
} from '../actions/transaction_action';

const TransactionReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TRANSACTIONS:
            return merge({}, state, action.transactions.data)
        default:
            return state;
    }
};

export default TransactionReducer;