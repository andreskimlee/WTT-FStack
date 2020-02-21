import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import MainPage from './mainpage';
import { withRouter } from 'react-router-dom'

const msp = (state, ownProps) => {
    return {
        currentUser: state.session.user
    };
};

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(msp, mdp)(MainPage));


