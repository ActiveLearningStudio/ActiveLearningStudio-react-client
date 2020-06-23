import React, { useState } from "react";
import { connect } from "react-redux";
import validator from "validator";
import bg from "../images/loginbg.png";
import bg1 from "../images/loginbg2.png";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  startLogin,
  ecceptterms,
  show_login,
  show_term,
} from "./../actions/auth";
import logo from "../images/logo.svg";
import terms from "../images/terms.png";

import loader from "../images/loader.svg";
import pdf from "../pdf/Curriki_Subscription_Agreement.pdf";
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
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
  onEmailChange = (e) => {
    this.setState({ email: e.target.value }, () => {
      !validator.isEmail(this.state.email)
        ? this.setState({ error: "Please  enter a valid email" })
        : this.setState({ error: "" });
    });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value }, () => {
      validator.isEmpty(this.state.password)
        ? this.setState({ error: "Please enter your password" })
        : this.setState({ error: "" });
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;

      this.setState({ apiLoading: true });
      await this.props.startLogin(email, password);
      this.props.history.push("/");
      this.setState({ apiLoading: false });
    } catch (e) {
      this.setState({ apiLoading: false });
      return this.setState({ error: e.message });
    }
  };

  onSubmitterms = async (e) => {
    e.preventDefault();
    this.setState({
      selectterms: false,
    });
    if (this.state.privacy && this.state.subsription) {
      this.props.ecceptterms(
        localStorage.getItem("temp_email"),
        localStorage.getItem("temp_pass")
      );
    } else {
      this.setState({
        selectterms: true,
      });
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
      <div className="newlogin">
        <img className="headerlogologin" src={logo} alt="" />
        {this.props.showbox.login ? (
          <div className="login-container">
            <div className="login-left">
              <h1>Login to Curriki Studio</h1>
              <h2>
                Powering the creation of the world’s most immersive learn
                experiences
              </h2>
              <h3>
                CurrikiStudio is changing the way learning experiences are
                designed, created, and delivered to a new generation of
                learners.
              </h3>
              {this.renderError()}
              <form
                onSubmit={this.onSubmit}
                autoComplete="off"
                className="login-form"
              >
                <div className="form-group username-box">
                  <i class="fa fa-user" aria-hidden="true"></i>{" "}
                  <input
                    className="username"
                    type="text"
                    name="email"
                    placeholder="Username"
                    onChange={this.onEmailChange}
                    autoFocus
                  />
                </div>

                <div className="form-group password-box">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                  <input
                    className="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                {/* <div className="form-group rememberme-check-box">
                  <label>
                    <input
                      type="checkbox"
                      name="rememberme"
                      onChange={this.onPasswordChange}
                    />
                    Remember Me
                  </label>
                  <div className="forgot-password-box">
                    <a href="/">Reset Password</a>
                  </div>
                </div> */}
                <div className="form-group">
                  <button
                    className="btn btn-primary login-submit"
                    disabled={this.isDisabled()}
                  >
                    {this.state.apiLoading == true ? (
                      <img src={loader} alt="" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="login-container terms_section">
            <div onClick={this.props.showLogin}>
              <i className="fa fa-times" />
            </div>
            <img src={terms} alt="" />
            <h1>Free to Create</h1>
            <form
              onSubmit={this.onSubmitterms}
              autoComplete="off"
              className="login-form"
            >
              <div className="form-group">
                <button className="btn btn-primary login-submit">
                  {" "}
                  Accept & Connect
                </button>
              </div>
              <h3>
                I understand that using the CurrikiStudio online service is
                subject to the Curriki Subscription Agreement and Privacy Policy.{" "}
              </h3>
              <h4>
                I agree to the following terms and have reviewed the
                agreements.
              </h4>
              {
                <h4
                  style={{
                    marginTop: "15px",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: this.state.selectterms && "red",
                  }}
                >
                  Before proceeding, please click on the documents below to view our agreements.
                </h4>
              }
              <div className="form-group checkbox">
                <div class="checkbox">
                  <div
                    className={this.state.subsription ? "active" : "non-active"}
                    onClick={() => {
                      this.setState({
                        subsription: !this.state.subsription,
                      });
                      window.open(
                        pdf,
                        "_blank" // <- This is what makes it open in a new window.
                      );
                    }}
                  >
                    <i class="fa fa-square-o" aria-hidden="true"></i>
                    Subscription Agreement{}
                  </div>
                </div>
                {/* <div class="checkbox">
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

                <div class="checkbox ">
                  <div
                    className={this.state.privacy ? "active" : "non-active"}
                    onClick={() => {
                      this.setState({
                        privacy: !this.state.privacy,
                      });
                      window.open(
                        "https://www.curriki.org/privacy-policy/",
                        "_blank" // <- This is what makes it open in a new window.
                      );
                    }}
                  >
                    <i class="fa fa-square-o" aria-hidden="true"></i> Privacy
                    policy{" "}
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
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    showbox: state.loginshow,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
