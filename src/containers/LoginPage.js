import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import bg from "../images/loginbg.png";
import bg1 from "../images/loginbg2.png";
import { withRouter } from "react-router-dom";
import { startLogin } from "./../actions/auth";
import logo from "./../images/logo.svg";
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
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
      <div className="newlogin">
        <img className="headerlogologin" src={logo} alt="" />
        <div className="login-container">
          <div className="login-left">
            <h1>Login to Curriki Studio</h1>
            <h2>
              Powering the creation of the world’s most immersive learn
              experiences
            </h2>
            <h3>
              CurrikiStudio is changing the way learning experiences are
              designed, created, and delivered to a new generation of learners.
            </h3>
            {this.renderError()}
            <form
              onSubmit={this.onSubmit}
              autoComplete="off"
              className="login-form"
            >
              <div className="form-group username-box">
                <i className="fa fa-user" aria-hidden="true"></i>{" "}
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
                <i className="fa fa-lock" aria-hidden="true"></i>
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password)),
});
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
