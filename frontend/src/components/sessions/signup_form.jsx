import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      username: '',
      fullName: '',
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      fullName: this.state.fullName
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
        <div className="session-outer">
          <img src="https://outfittr-assets.s3.amazonaws.com/outfittr-logo-v3.png" alt="Outfittr Logo" className='form-logo' />
          <h2>Welcome To Outfittr!</h2>
        {/* <Link to="/splash">
          <button>Log In</button>
        </Link> */}
        <form onSubmit={this.handleSubmit}>
          <div className="session-form">
            <input type="text"
              value={this.state.fullName}
              onChange={this.update('fullName')}
              placeholder="Full Name"
            />
            <br />
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <br />
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm password"
            />
            <br/>
              <input type="submit" value="Sign Up" />
              <div className="error-list">
                {this.renderErrors()}
              </div>
          </div>
        </form>
          <div className="switch-form-link">
            <br/>
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
          </div>
      </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);