
import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import TransactionErrorsReducer from './transaction_errors_reducer'

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  transaction: TransactionErrorsReducer
});

export default ErrorsReducer;