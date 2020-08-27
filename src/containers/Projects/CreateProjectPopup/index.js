import React, {
  useEffect, useRef, useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Swal from 'sweetalert2';

import computer from 'assets/images/computer.svg';
import loader from 'assets/images/loader.svg';
import pexel from 'assets/images/pexel.png';
import { required, maxLength } from 'utils';
import {
  createProjectAction,
  updateProjectAction,
  uploadProjectThumbnailAction,
} from 'store/actions/project';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';
import PexelsAPI from 'components/models/pexels';

import './style.scss';

const maxLength80 = maxLength(80);

// TODO: need to restructure code, clean up attributes
// remove unused code,

let imageValidation = '';

const onSubmit = async (values, dispatch, props) => {
  const {
    history,
    project: { thumbUrl },
    editMode,
  } = props;
  const { name, description } = values;

  try {
    // if (!thumbUrl) {
    //   imageValidation = "* Required";
    //   return false;
    // }

    if (editMode) {
      // update
      await dispatch(
        updateProjectAction(props.match.params.projectId, {
          name,
          description,
          thumb_url: thumbUrl,
        }),
      );
    } else {
      // create
      await dispatch(
        props.project.thumb_url
          ? createProjectAction({
            name,
            description,
            thumb_url: thumbUrl,
          })
          : createProjectAction({
            name,
            description,
            // eslint-disable-next-line max-len
            thumb_url:
                'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
          }),
      );
    }

    history.push('/');
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Failed to ${editMode ? 'update' : 'create'} project.`,
    });
  }
};

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('thumb', e.target.files[0]);

    imageValidation = '';
    await props.uploadProjectThumbnail(formData);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to upload thumb.',
    });
  }
};

let CreateProjectPopup = (props) => {
  const {
    isLoading,
    project,
    editMode,
    handleSubmit,
    handleCloseProjectModal,
  } = props;

  const [modalShow, setModalShow] = useState(false);
  const openFile = useRef();

  // remove popup when escape is pressed
  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        handleCloseProjectModal(event);
      }
    },
    [handleCloseProjectModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <div className="create-program-wrapper">
      <PexelsAPI
        show={modalShow}
        project
        onHide={() => {
          setModalShow(false);
        }}
        searchName="abstract"
      />

      <form
        className="create-playlist-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="project-name">
          <Field
            name="name"
            component={InputField}
            type="text"
            label="Enter Project Name (Up to 80 characters)"
            validate={[required, maxLength80]}
          />
        </div>

        <div className="upload-thumbnail check">
          <div className="upload_placeholder">
            <label style={{ display: 'none' }}>
              <input
                ref={openFile}
                type="file"
                onChange={(e) => uploadThumb(e, props)}
                accept="image/x-png,image/jpeg"
              />
              <span>Upload</span>
            </label>

            <span className="validation-error">{imageValidation}</span>

            <div>
              {project.progress}
              {project.thumbUrl ? (
                <div className="thumb-display">
                  <div
                    className="success"
                    style={{
                      color: 'green',
                      marginBottom: '20px',
                      fontSize: '20px',
                    }}
                  >
                    Image Uploaded:
                  </div>
                  <div className="imgbox">
                    {project.thumbUrl.includes('pexels.com') ? (
                      <img src={project.thumbUrl} alt="thumbnail" />
                    ) : (
                      <img src={global.config.resourceUrl + project.thumbUrl} alt="thumbnail" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="new-box">
                  <h2>Default Selected thumbnail</h2>
                  <div className="imgbox">
                    {/* eslint-disable-next-line max-len */}
                    <img
                      src="https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280"
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="button-flex">
              <h2>Change thumbnail from below options</h2>

              <div className="pexel" onClick={() => setModalShow(true)}>
                <img src={pexel} alt="pexel" />
                <p>Select from Pexels</p>
              </div>

              <div
                className="gallery"
                onClick={() => {
                  openFile.current.click();
                }}
              >
                <img src={computer} alt="" />
                <p>Upload a Photo From your computer</p>
              </div>
            </div>
          </div>

          <br />

          <p className="disclaimer">
            Project Image dimension should be
            {' '}
            <strong>290px width and 200px height.</strong>
          </p>
        </div>

        <div className="project-description">
          <h2 className="mt-4 mb-0">Program Description</h2>

          <Field
            name="description"
            component={TextareaField}
            validate={[required]}
          />
        </div>

        <div className="create-project-template-wrapper">
          <button
            type="submit"
            className="create-project-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <img src={loader} alt="" />
            ) : editMode ? (
              'Update Project'
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

CreateProjectPopup.propTypes = {
  project: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCloseProjectModal: PropTypes.func.isRequired,
};

CreateProjectPopup = reduxForm({
  form: 'createProjectForm',
  enableReinitialize: true,
  onSubmit,
})(CreateProjectPopup);

const mapDispatchToProps = (dispatch) => ({
  uploadProjectThumbnail: (formData) => dispatch(uploadProjectThumbnailAction(formData)),
});

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.project.selectedProject
      ? state.project.selectedProject.name
      : null,
    description: state.project.selectedProject
      ? state.project.selectedProject.description
      : null,
  },
  isLoading: state.project.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateProjectPopup),
);
