import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignUp from './sessions/session_page';
import SignIn from './sessions/login_form_container';

const App = (props) => (

  <div>
    <AuthRoute path="/signup" component={SignUp} loggedIn={props.state().session.isAuthenticated} />
    <AuthRoute path="/signin" component={SignIn} loggedIn={props.state().session.isAuthenticated} />
  </div>

);

export default App;