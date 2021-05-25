import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Alert } from 'react-bootstrap';
import { doLoginAction } from 'store/actions/LMS/genericLMS';
import Activity from 'containers/LMS/Generic/GenericLMSActivity';
import logo from 'assets/images/logo.svg';
// import './styles.scss';

function GenericLMSActivityPage(props) {
  const {
    match,
    showActivity,
    showLogin,
    doLogin,
    errors,
  } = props;
  const [loginParams, setLoginParams] = useState({});

  const handleChange = (event) => {
    setLoginParams({
      ...loginParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({
      username: loginParams.username,
      password: loginParams.password,
      lmsName: match.params.lmsName,
      lmsUrl: decodeURIComponent(match.params.lmsUrl),
      lmsClientId: match.params.lmsClientId,
      courseId: match.params.lmsCourseId,
      activityId: match.params.activityId,
    });
  };

  return (
    <div className="gclass-activity-container">
      <section className="main-page-content preview iframe-height-resource-shared">
        <Helmet>
          <script
            src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js"
            charset="UTF-8"
          />
        </Helmet>
        <div className="flex-container previews">
          <div className="activity-bg left-vdo">
            <div className="main-item-wrapper desktop-view">
              <div className="item-container">
                {showActivity && <Activity activityId={match.params.activityId} />}
                {showLogin && (
                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <img className="curriki-logo" src={logo} alt="" />
                      </div>
                    </div>
                    {errors && errors.map((err) => (
                      <div className="row">
                        <div className="col text-center">
                          <Alert variant="warning">
                            {err}
                          </Alert>
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col text-center">
                        <form onSubmit={handleLogin}>
                          <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" type="text" name="username" placeholder="Username" onChange={handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" onChange={handleChange} />
                          </div>
                          <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

GenericLMSActivityPage.propTypes = {
  match: PropTypes.object.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showActivity: PropTypes.bool.isRequired,
  errors: PropTypes.any.isRequired,
  doLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showActivity: state.genericLMS.showActivity,
  showLogin: state.genericLMS.showLogin,
  errors: state.genericLMS.errors,
});

const mapDispatchToProps = (dispatch) => ({
  doLogin: (params) => dispatch(doLoginAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenericLMSActivityPage);
