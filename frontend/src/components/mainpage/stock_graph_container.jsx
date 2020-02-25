import { connect } from 'react-redux';
import StockGraph from './stock_graph';
import { withRouter } from 'react-router-dom'
import { createTransaction } from '../../actions/transaction_action'

const msp = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.transaction
    };
};

const mdp = dispatch => ({
    createTransaction: transaction => dispatch(createTransaction(transaction))
});

export default withRouter(connect(msp, mdp)(StockGraph));

