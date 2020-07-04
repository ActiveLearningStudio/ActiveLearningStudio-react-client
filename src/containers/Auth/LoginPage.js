import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';

import { startLogin } from 'store/actions/auth';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import logo from 'assets/images/logo.svg';
import loader from 'assets/images/loader.svg';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChangeField = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;

      this.setState({ apiLoading: true });
      await this.props.startLogin(email, password);
      this.props.history.push('/');
      this.setState({ apiLoading: false });
    } catch (e) {
      this.setState({ apiLoading: false });
      return this.setState({ error: e.message });
    }
  };

  isDisabled = () => {
    const { email, password } = this.state;
    return !(validator.isEmail(email) && !validator.isEmpty(password));
  }

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
    const { email, password, rememberMe } = this.state;

    return (
      <div className="auth-page">
        <img className="auth-header-logo" src={logo} alt="" />

        <div className="auth-container">
          <h1 className="auth-title">Login to Curriki Studio</h1>
          <h2 className="auth-subtitle">Powering the creation of the world’s most immersive learn experiences</h2>
          <h3 className="auth-description">
            CurrikiStudio is changing the way learning experiences are
            designed, created, and delivered to a new generation of learners.
          </h3>

          <form
            onSubmit={this.onSubmit}
            autoComplete="off"
            className="auth-form"
          >
            <div className="form-group">
              <i className="fa fa-user" aria-hidden="true" />
              <input
                autoFocus
                className="input-box"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.onChangeField('email')}
              />
            </div>

            <div className="form-group">
              <i className="fa fa-lock" aria-hidden="true" />
              <input
                className="password-box"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.onChangeField('password')}
              />
            </div>

            <div className="form-group remember-me">
              <label>
                <input
                  type="checkbox"
                  name="remember-me"
                  value={rememberMe}
                  onChange={this.onChangeField('rememberMe')}
                />
                Remember Me
              </label>
              <div className="forgot-password-box">
                <a href="/">Reset Password</a>
              </div>
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary login-submit"
                disabled={this.isDisabled()}
              >
                {this.state.apiLoading ? (
                  <img src={loader} alt="" />
                ) : (
                  'Login'
                )}
              </button>
            </div>

            {this.renderError()}

            <div className="form-group text-center">
              New to here?
              {' '}
              <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>

        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

LoginPage.propTypes = {

};

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password)),
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
  errorMessage: state.auth.errorMessage,
  showbox: state.loginshow,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage),
);
