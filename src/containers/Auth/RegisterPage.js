import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';

import {
  startLogin,
  ecceptterms,
  show_login,
  show_term,
} from '../../store/actions/auth';
import pdf from '../../assets/pdf/Curriki_Subscription_Agreement.pdf';

import bg from '../../assets/images/loginbg.png';
import bg1 from '../../assets/images/loginbg2.png';
import logo from '../../assets/images/logo.svg';
import terms from '../../assets/images/terms.png';
import loader from '../../assets/images/loader.svg';

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organizationName: '',
      jobTitle: '',
      error: '',

      apiLoading: false,
      terms: false,
      privacy: false,
      subsription: false,
      selectterms: false,
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

      if (!validator.isEmail(email)) {
        this.setState({ error: 'Please enter a valid email' });
        return;
      }

      if (validator.isEmpty(this.state.password)) {
        this.setState({ error: 'Please enter your password' });
        return;
      }

      // this.props.history.push('/');
    } catch (e) {
      return this.setState({ error: e.message });
    }
  };

  onSubmitTerms = async (e) => {
    e.preventDefault();
    this.setState({
      selectterms: false,
    });
    if (this.state.privacy && this.state.subsription) {
      this.props.ecceptterms(
        localStorage.getItem('temp_email'),
        localStorage.getItem('temp_pass'),
      );
    } else {
      this.setState({
        selectterms: true,
      });
    }
  };

  isDisabled = () => !(!this.state.error
        && validator.isEmail(this.state.email)
        && !validator.isEmpty(this.state.password));

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
    const {
      firstName,
      lastName,
      email,
      password,
      organizationName,
      jobTitle,
    } = this.state;

    return (
      <div className="auth-page">
        <img className="auth-header-logo" src={logo} alt="" />
        {this.props.showbox.login ? (
          <div className="auth-container">
            <div className="login-left">
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
                <div className="form-group d-flex">
                  <div className="input-box">
                    <i className="fa fa-user" aria-hidden="true" />
                    <input
                      autoFocus
                      className="username"
                      type="text"
                      name="first-name"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={this.onChangeField('firstName')}
                    />
                  </div>

                  <div className="input-box">
                    <i className="fa fa-user" aria-hidden="true" />
                    <input
                      className="username"
                      type="text"
                      name="last-name"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={this.onChangeField('lastName')}
                    />
                  </div>
                </div>

                <div className="form-group input-box">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <input
                    className="username"
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={email}
                    onChange={this.onChangeField('email')}
                  />
                </div>

                <div className="form-group password-box">
                  <i className="fa fa-lock" aria-hidden="true" />
                  <input
                    className="password"
                    type="password"
                    name="password"
                    placeholder="Password*"
                    value={password}
                    onChange={this.onChangeField('password')}
                  />
                </div>

                <div className="form-group d-flex">
                  <div className="input-box">
                    <i className="fa fa-user" aria-hidden="true" />
                    <input
                      className="username"
                      type="text"
                      name="organization-name"
                      placeholder="Organization Name*"
                      value={organizationName}
                      onChange={this.onChangeField('organizationName')}
                    />
                  </div>

                  <div className="input-box">
                    <i className="fa fa-user" aria-hidden="true" />
                    <input
                      className="username"
                      type="text"
                      name="job-title"
                      placeholder="Job Title*"
                      value={jobTitle}
                      onChange={this.onChangeField('jobTitle')}
                    />
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
                      'Sign Up'
                    )}
                  </button>
                </div>

                {this.renderError()}

                <div className="form-group text-center">
                  Already have an account?
                  {' '}
                  <Link to="/login">Login here</Link>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="auth-container terms_section">
            <div onClick={this.props.showLogin}>
              <i className="fa fa-times" />
            </div>
            <img src={terms} alt="" />
            <h1>Free to Create</h1>
            <form
              onSubmit={this.onSubmitTerms}
              autoComplete="off"
              className="auth-form"
            >
              <div className="form-group">
                <button className="btn btn-primary login-submit">
                  Accept & Connect
                </button>
              </div>
              <h3>
                I understand that using the CurrikiStudio online service is
                subject to the Curriki Subscription Agreement and Privacy Policy.
              </h3>
              <h4>
                I agree to the following terms and have reviewed the agreements.
              </h4>
              <h4
                style={{
                  marginTop: '15px',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: this.state.selectterms && 'red',
                }}
              >
                Before proceeding, please click on the documents below to view our agreements.
              </h4>
              <div className="form-group checkbox">
                <div className="checkbox">
                  <div
                    className={this.state.subsription ? 'active' : 'non-active'}
                    onClick={() => {
                      this.setState({
                        subsription: !this.state.subsription,
                      });
                      window.open(
                        pdf,
                        '_blank', // <- This is what makes it open in a new window.
                      );
                    }}
                  >
                    <i className="fa fa-square-o" aria-hidden="true" />
                    Subscription Agreement
                  </div>
                </div>
                {/* <div className="checkbox">
                                  <label>
                                      <input
                                          type="checkbox"
                                          value=""
                                          name="terms"
                                          checked={this.state.terms}
                                          onChange={(e) => {
                                              this.setState({
                                                  terms: !this.state.terms,
                                              });
                                          }}
                                      />
                                      <a href=""> Terms of Service </a>
                                  </label>
                              </div> */}
                <div className="checkbox">
                  <div
                    className={this.state.privacy ? 'active' : 'non-active'}
                    onClick={() => {
                      this.setState({
                        privacy: !this.state.privacy,
                      });
                      window.open(
                        'https://www.curriki.org/privacy-policy/',
                        '_blank', // <- This is what makes it open in a new window.
                      );
                    }}
                  >
                    <i className="fa fa-square-o" aria-hidden="true" />
                    {' '}
                    Privacy policy
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password)),
  showLogin: () => dispatch(show_login()),
  showTerms: () => dispatch(show_term()),
  ecceptterms: (email, password) => dispatch(ecceptterms(email, password)),
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
  errorMessage: state.auth.errorMessage,
  showbox: state.loginshow,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage),
);
