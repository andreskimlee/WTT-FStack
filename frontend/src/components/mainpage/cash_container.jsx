import { connect } from 'react-redux';
import Cash from './cash';
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../../actions/user_actions'

const msp = (state, ownProps) => {
    return {
        user: state.entities.users,
        currentUser: state.session.user
    };
};

const mdp = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
});

export default withRouter(connect(msp, mdp)(Cash));

