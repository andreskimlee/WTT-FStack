import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignUp from './sessions/session_page';
import SignIn from './sessions/login_form_container';
import MainPage from './mainpage/mainpage_container'
import TransactionPage from '../components/mainpage/transactions_container'
import NavBar from '../components/mainpage/navbar_container'
const App = (props) => (

  <div>
    <ProtectedRoute exact path="/" component={MainPage} loggedIn={props.state().session.isAuthenticated} />
    <AuthRoute path="/signup" component={SignUp} loggedIn={props.state().session.isAuthenticated} />
    <AuthRoute path="/signin" component={SignIn} loggedIn={props.state().session.isAuthenticated} />
    <ProtectedRoute exact path="/transactions" component={TransactionPage} loggedIn={props.state().session.isAuthenticated} />
  </div>

);

export default App;