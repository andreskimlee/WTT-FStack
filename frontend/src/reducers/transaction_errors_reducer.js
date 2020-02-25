import {

    RECEIVE_TRANSACTION_ERRORS
} from '../actions/transaction_action';


const TransactionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TRANSACTION_ERRORS:
            return action.errors

        default:
            return state;
    }
};

export default TransactionErrorsReducer;