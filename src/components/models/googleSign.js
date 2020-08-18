/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal /* , Button */ } from 'react-bootstrap';
import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';

import logo from 'assets/images/loginlogo.png';
import {
  googleShare,
  googleClassRoomLoginAction,
  googleClassRoomLoginFailureAction,
} from 'store/actions/gapi';
import { copyProject } from 'store/actions/share';

const GoogleModel = ({
  show,
  onHide,
  googleClassRoomLogin,
  googleClassRoomLoginFailure,
  projectId,
}) => {
  const dataRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  // const [rooms, setRooms] = useState(['a', 'b', 'c']);
  useEffect(() => {
    if (dataRedux.defaultShareState.googleShare === true) {
      setShowForm(true);
    } else if (dataRedux.defaultShareState.googleShare === false) {
      setShowForm(false);
    } else if (dataRedux.defaultShareState.googleShare === 'close') {
      onHide();
    }
  }, [dataRedux, onHide]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="model-box-google model-box-view"
    >
      <Modal.Header closeButton>
        <img src={logo} alt="" />
      </Modal.Header>

      <Modal.Body>
        <div className="sign-in-google">
          {!showForm ? (
            <div className="content-authorization">
              <p>
                With CurrikiStudio you can publish your Project as a new Google Classroom course.
              </p>
              <p>To start, please log into your Google account.</p>
              <div>
                <GoogleLogin
                  clientId="898143939834-9ioui2i9ghgrmcgmgtg0h6rsf83d0t0c.apps.googleusercontent.com"
                  onSuccess={googleClassRoomLogin}
                  onFailure={(response) => googleClassRoomLoginFailure(response)}
                  scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                  cookiePolicy="single_host_origin"
                >
                  <span>Login with Google</span>
                </GoogleLogin>
              </div>
            </div>
          ) : (
            <div className="classroom-form">
              <div>
                <h1>
                  Are you sure you want to share this Project to Google Classroom?
                </h1>
                <Formik
                  initialValues={{
                    course: 'test',
                    heading: 'test',
                    description: 'test',
                    room: 'test',
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.course) {
                      errors.course = 'Course Required';
                    }
                    if (!values.heading) {
                      errors.heading = 'Heading Required';
                    }
                    if (!values.description) {
                      errors.description = 'Description Required';
                    }
                    if (!values.room) {
                      errors.room = 'Room Required';
                    }
                    if (values.room === 'Select your room') {
                      errors.room = 'Required';
                    }
                    return errors;
                  }}
                  onSubmit={(/* values, { setSubmitting } */) => {
                    dispatch(googleShare('close'));
                    copyProject(projectId);
                  }}
                >
                  {({
                    // values,
                    // errors,
                    // touched,
                    // handleChange,
                    // handleBlur,
                    handleSubmit,
                    // isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      {/* <input
                        type="text"
                        name="course"
                        class="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.course}
                        placeholder="Course Name"
                      /> */}

                      {/* {errors.course && touched.course && (
                        <div className="form-error">{errors.course}</div>
                      )} */}

                      {/* <select
                        class="form-control"
                        name="room"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.room}
                        placeholder="Course Name"
                      >
                        <option>Select your room</option>
                        {rooms.map((data) => {
                          return <option>{data}</option>;
                        })}
                      </select> */}

                      {/* {errors.room && touched.room && (
                        <div className="form-error">{errors.room}</div>
                      )} */}

                      {/* <input
                        type="text"
                        name="heading"
                        class="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.heading}
                        placeholder="Heading"
                      /> */}

                      {/* {errors.heading && touched.heading && (
                        <div className="form-error">{errors.heading}</div>
                      )} */}

                      {/* <textarea
                        class="form-control"
                        rows="5"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder="Description"
                      /> */}

                      {/* {errors.description && touched.description && (
                        <div className="form-error">{errors.description}</div>
                      )} */}

                      {/*
                      <p>
                        Are you sure you want to share this Project to Google Classroom?
                      </p>
                      */}
                      <button type="submit">Confirm</button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

GoogleModel.propTypes = {
  show: PropTypes.bool.isRequired,
  projectId: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
  googleClassRoomLogin: PropTypes.func.isRequired,
  googleClassRoomLoginFailure: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  googleClassRoomLogin: (response) => dispatch(googleClassRoomLoginAction(response)),
  googleClassRoomLoginFailure: (response) => dispatch(googleClassRoomLoginFailureAction(response)),
});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoogleModel),
);
