import { connect } from 'react-redux';
import Portfolio from './portfolio';
import { withRouter } from 'react-router-dom'
import { fetchAllTrans } from '../../actions/transaction_action'

const msp = (state, ownProps) => {

    return {
        currentUser: state.session.user,
        transactions: Object.values(state.entities.transactions)
    };
};

const mdp = dispatch => ({
    fetchAllTrans: userId => dispatch(fetchAllTrans(userId))
});

export default withRouter(connect(msp, mdp)(Portfolio));
