import { connect } from 'react-redux';
import Cash from './cash';
import { withRouter } from 'react-router-dom'

const msp = (state, ownProps) => {
    return {
        user: state.entities.users
    };
};

const mdp = dispatch => ({
});

export default withRouter(connect(msp, mdp)(Cash));

