import React from 'react';
import { Link } from 'react-router-dom';
import Wallpaper from '../../assets/signin_wallpaper.png'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }
    this.setState({ errors: nextProps.errors });
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

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user);
  }

  handleDemoLogin(e) {
    e.preventDefault();

    let user = {
      email: 'andreskimlee@gmail.com',
      password: 'Hiremepls'
    };
    this.props.login(user);
  }

  render() {
    return (
      <div className="splash-form-container">
        <img className="wallpaper" src={Wallpaper} alt="session-wallpaper" />
        <div className="session-outer">
          <h2>Welcome Back To PiperHood!</h2>
          {/* <Link to="/splash/signup">
          <button>Signup</button>
        </Link> */}
          <form className="session-form" onSubmit={this.handleSubmit}>
            <p>Email</p>
            <input

              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              className="field-inputs"
            />
            <br />
            <p>Password</p>
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              className="field-inputs"
            />
            <br />
            <input type="submit" className="login-button" value="Log in" />
            <div className="error-list">
              {this.renderErrors()}
            </div>
          </form>
          <form className="demo-user-form" onSubmit={this.handleDemoLogin}>
            <input className="demo-login-button" type="submit" value="Log in as Demo User" />
          </form>
          <div className="switch-form-link">
            {" "}
            Don't have an account? <Link className="signup-text" to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;