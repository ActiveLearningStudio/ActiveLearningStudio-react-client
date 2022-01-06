import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { Formik } from 'formik';
import close from 'assets/images/grayclose.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const bounceAnimation = keyframes`${slideInRight}`;
const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;
function CreateTeamPopup(props) {
  const {
    setShowCreateTeamModal,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowCreateTeamModal(false);
    }
  }, [setShowCreateTeamModal]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <div className="team-modal">
      <div className="modal fade right" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="row-team">
              <div className="col-md-12">
                <button
                  type="button"
                  className="close-team-btn"
                  data-dismiss="modal"
                  onClick={() => setShowCreateTeamModal(false)}
                >
                  <img
                    style={{
                      cursor: 'pointer',
                    }}
                    src={close}
                    alt="close"
                  />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-title">
                <div className="row-team">
                  <div className="col-md-12">
                    <h1 className="mb-0">
                      <span>
                        {' '}
                        Add team
                        {/* {`${editMode ? "Update" : "Create a"} Project`} */}
                      </span>
                    </h1>
                    <p>Start your team by adding a name and description.</p>
                  </div>
                </div>
              </div>
              <Formik
                initialValues={{
                  teamName: '',
                  description: '',
                  noovo_group_title: '',
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.teamName) {
                    errors.teamName = '* Required';
                  }
                  if (!values.description) {
                    errors.description = '* Required';
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  console.log(values);
                  // handleCreatePlaylistSubmit();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <p className="label-title">Title</p>
                      <input
                        type="text"
                        name="teamName"
                        className="form-control"
                        autoFocus="on"
                        autoComplete="off"
                        value={values.teamName}
                        placeholder="e.g Team name"
                        handleBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <div className="error">
                        {errors.teamName && touched.teamName && errors.teamName}
                      </div>
                    </div>
                    <div className="form-group">
                      <p className="label-title">Description</p>
                      <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        autoFocus="on"
                        autoComplete="off"
                        value={values.description}
                        handleBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <div className="error">
                        {errors.description && touched.description && errors.description}
                      </div>
                    </div>
                    <div className="form-group">
                      <h6 className="satelliteteaminfo"> Satellite Team Information (Optional)</h6>
                      <p className="label-title">Title</p>
                      <input
                        type="text"
                        name="noovo_group_title"
                        className="form-control"
                        autoFocus="on"
                        autoComplete="off"
                        value={values.noovo_group_title}
                        handleBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="add-team-btn">
                        <div>
                          <FontAwesomeIcon icon="plus" />
                          Save & Continue
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>

  );
}

CreateTeamPopup.propTypes = {
  setShowCreateTeamModal: PropTypes.func.isRequired,
};

export default CreateTeamPopup;
