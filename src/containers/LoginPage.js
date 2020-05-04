import React from "react";
import { connect } from "react-redux";
import validator from "validator";


import { withRouter } from 'react-router-dom';
import { startLogin } from "./../actions/auth";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onEmailChange = e => {
    this.setState({ email: e.target.value }, () => {
      !validator.isEmail(this.state.email)
        ? this.setState({ error: "Please  enter a valid email" })
        : this.setState({ error: "" });
    });
  };
  onPasswordChange = e => {
    this.setState({ password: e.target.value }, () => {
      validator.isEmpty(this.state.password)
        ? this.setState({ error: "Please enter your password" })
        : this.setState({ error: "" });
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      await this.props.startLogin(email, password);
      this.props.history.push("/");
    } catch (e) {
      return this.setState({ error: e.message });
    }
  };
  isDisabled = () => {
    return !this.state.error &&
      validator.isEmail(this.state.email) &&
      !validator.isEmpty(this.state.password)
      ? false
      : true;
  };
  renderError = () => {
    if (this.props.error) {
      return (
        <p className="error-msg alert alert-danger" role="alert">
          {this.props.errorMessage}
        </p>
      );
    }
  };
  render() {
    return (
        <div>
          <div className="login-container">
          <div className="login-left">
                <h1>Login to Continue</h1>
                <p>Welcome to the Active Learning Studio. Sign in with your user name and password to continue creating exciting learning experiences!</p>
                {this.renderError()}
                <form onSubmit={this.onSubmit} autoComplete="off" className="login-form">
                  <div className="form-group username-box">
                    <span className="username-icon"></span>
                    <input
                          className="username"
                          type="text"
                          name="email"
                          placeholder="Username"
                          onChange={this.onEmailChange}
                          autoFocus
                        />
                  </div>
                  <div className="forgot-password-box">
                    <a href="/">Forgot?</a>
                  </div>
                  <div className="form-group password-box">
                    <span className="password-icon"></span>
                    <input
                          className="password"
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={this.onPasswordChange}
                        />
                  </div>
                  <div className="form-group rememberme-check-box">
                    <label>
                      <input
                          type="checkbox"
                          name="rememberme"
                          onChange={this.onPasswordChange}
                        />
                        <span></span>
                        <strong>Remember Me</strong>
                      </label>
                  </div>
                  <div className="form-group">
                      <button
                        className="btn btn-primary login-submit"
                        disabled={this.isDisabled()}
                      >
                        Login
                      </button>
                    </div>
                    <div className="create-account-block">
                      <p>Don't have an account yet? <a href="/">Sign up</a></p>
                    </div>
                </form>
              </div>
              
            <div className="login-right">
              <div className="login-logo">
                <img src="/images/login-logo.png" alt="Login Logo" />
              </div>
              <div className="login-right-heading">
                <h2>Powering the World's Best Learning Experiences</h2>
              </div>
              <div className="login-right-text">
                
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
});
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
  };
};



export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(LoginPage))