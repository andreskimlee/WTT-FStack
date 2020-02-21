import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Wallpaper from '../../assets/signin_wallpaper.png'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      name: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      name: this.state.name
    };

    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="splash-form-container">
        <img className="wallpaper" src={Wallpaper} alt="session-wallpaper" />
        <div className="session-outer">
          <h2>Welcome To PiperHood!</h2>
          {/* <Link to="/splash">
          <button>Log In</button>
        </Link> */}
          <form onSubmit={this.handleSubmit}>
            <div className="session-form">
              <p>Full Name</p>
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
              />
              <br />
              <p>Email</p>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
              />
              <br />
              <p>Password</p>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
              />
              <br />
              <p>Confirm Password</p>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}

              />
              <br />
              <input type="submit" value="Sign Up" className="Sign-up-button" />
              <div className="error-list">
                {this.renderErrors()}
              </div>
            </div>
          </form>
          <div className="switch-form-link">
            <br />
            <p>Already have an account? <Link className="sign-in-link" to="/signin">Sign in</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);