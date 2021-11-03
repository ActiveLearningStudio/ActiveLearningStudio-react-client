import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
// import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';

import computer from 'assets/images/computer.svg';
import loader from 'assets/images/loader.svg';
import pexel from 'assets/images/pexel.png';
import { required, maxLength } from 'utils';
import {
  createProjectAction,
  updateProjectAction,
  uploadProjectThumbnailAction,
  showCreateProjectModalAction,
  visibilityTypes,
} from 'store/actions/project';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';
import PexelsAPI from 'components/models/pexels';

import './style.scss';

const maxLength80 = maxLength(80);
const maxLength1000 = maxLength(1000);

// TODO: need to restructure code, clean up attributes
// remove unused code,

let imageValidation = '';
const projectShare = true;

const onSubmit = async (values, dispatch, props) => {
  const {
    history,
    project: { thumbUrl },
    editMode,
  } = props;
  const { name, description, vType } = values;
  // if (!thumbUrl) {
  //   imageValidation = "* Required";
  //   return false;
  // }
  if (editMode) {
    // UPDATE
    // Swal.fire({
    //   title: 'Please Wait !',
    //   html: 'Updating Project Setting ...',
    //   allowOutsideClick: false,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    // const result = await
    dispatch(
      updateProjectAction(props.match.params.projectId, {
        name,
        description,
        thumb_url: thumbUrl,
        organization_visibility_type_id: vType || 1,
      }),
    );
    // if (result?.errors && result?.message) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: result?.message ? result?.message : 'Something went wrong!',
    //   });
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     text: 'Project Settings Updated!',
    //   });
    // }
    history.goBack();
  } else {
    // create
    // Swal.fire({
    //   title: 'Please Wait !',
    //   html: 'We are creating a brand new project for you ...',
    //   allowOutsideClick: false,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    // const result = await
    dispatch(
      props.project.thumbUrl
        ? createProjectAction({
          name,
          description,
          thumb_url: thumbUrl,
          is_public: projectShare,
          organization_visibility_type_id: vType || 1,
        })
        : createProjectAction({
          name,
          description,
          is_public: projectShare,
          organization_visibility_type_id: vType || 1,
          // eslint-disable-next-line max-len
          thumb_url: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
        }),
    );
    // if (result?.errors && result?.message) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: result?.message ? result?.message : 'Something went wrong!',
    //   });
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     text: 'Project Created Successfully!',
    //   });
    // }
    history.push('/projects');
  }
  history.push('/studio/projects');
};
export const uploadThumb = async (e, permission, teamPermission, id, dispatch, editMode) => {
  const formData = new FormData();
  try {
    console.log(id);
    formData.append('thumb', e.target.files[0]);
    if (editMode) {
      formData.append('project_id', id);
    }
    imageValidation = '';
    await dispatch(uploadProjectThumbnailAction(formData));
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      // eslint-disable-next-line max-len
      text: permission?.Project?.includes('project:upload-thumb') || teamPermission?.Team?.includes('team:view-project') ? 'Image upload failed, kindly try again' : 'You do not have permission to upload image',
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
    showCreateProjectModal,
    getProjectVisibilityTypes,
    vType,
  } = props;
  const dispatch = useDispatch();
  const stateHeader = useSelector((state) => state.organization);
  const projectState = useSelector((state) => state.project);
  const { teamPermission } = useSelector((state) => state.team);
  const { permission } = stateHeader;
  const [modalShow, setModalShow] = useState(false);
  // const [publicProject, setPublicProject] = useState(true);
  const openFile = useRef();
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
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
    if (!editMode) {
      showCreateProjectModal();
    }
  }, [editMode, showCreateProjectModal, vType]); // Runs only once

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
  useEffect(() => {
    (async () => {
      const { data } = await getProjectVisibilityTypes();
      setVisibilityTypeArray(data.data);
    })();
  }, [getProjectVisibilityTypes]);

  return (

    // eslint-disable-next-line max-len
    (editMode && (teamPermission && Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-project') : permission?.Project?.includes('project:edit'))) || (!editMode && permission?.Project?.includes('project:create')) ? (
      <div className="create-program-wrapper">
        <PexelsAPI
          show={modalShow}
          project={project}
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
            <div className="label-toggle">
              <label>
                Enter Project Name (Up to 80 characters)
              </label>

              {/* {!editMode && (
                <div className="class-toggle" title="By default, it is not public">
                  <label>Make Project Public</label>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={25}
                    onChange={() => {
                      setPublicProject(!publicProject);
                      projectShare = !publicProject;
                    }}
                    checked={publicProject}
                    value={publicProject}
                  />
                </div>
              )} */}
            </div>

            <Field
              name="name"
              component={InputField}
              type="text"
              validate={[required, maxLength80]}
              autoComplete="new-password"
            />
          </div>

          <div className="upload-thumbnail check">
            <div className="upload_placeholder">
              <label style={{ display: 'none' }}>
                <input
                  ref={openFile}
                  type="file"
                  accept="image/x-png,image/jpeg"
                  onChange={(e) => {
                    if (e.target.files.length === 0) {
                      return true;
                    }
                    if (!(e.target.files[0].type.includes('png') || e.target.files[0].type.includes('jpg')
                      || e.target.files[0].type.includes('gif') || e.target.files[0].type.includes('jpeg'))) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Invalid file selected.',
                      });
                    } else if (e.target.files[0].size > 100000000) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Selected file size should be less then 100MB.',
                      });
                    } else {
                      uploadThumb(e, permission, teamPermission, projectState?.selectedProject?.id, dispatch, editMode);
                    }
                  }}
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

                    <div
                      className="imgbox"
                      style={{
                        backgroundImage: project.thumbUrl.includes('pexels.com')
                          ? `url(${project.thumbUrl})`
                          : `url(${global.config.resourceUrl}${project.thumbUrl})`,
                      }}
                    />
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
              <strong>280px width and 200px height. </strong>
              Maximun File size allowed is
              {' '}
              <strong>100MB.</strong>
            </p>
          </div>
          <div className="dropdown-visibilitytypes">
            <div id="dropdown-basic">
              <h2 className="mt-4 mb-0" style={{ paddingBottom: '7px' }}>
                Visibility Type
              </h2>
            </div>
            <Field
              name="vType"
              component="select"
              // onChange={({ target }) => { currentVisibilityType(target.value); }}
            >
              {visibilityTypeArray.map((vT) => (
                <option className="all-tg-lister" value={vT.id}>{vT.display_name}</option>
              ))}
            </Field>
          </div>
          <div className="project-description">
            <h2 className="mt-4 mb-0">Project Description</h2>

            <Field
              name="description"
              component={TextareaField}
              validate={[required, maxLength1000]}
              autoComplete="new-password"
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
    ) : <Alert style={{ marginTop: '25px' }} variant="danger">You are not authorized to access this.</Alert>
  );
};

CreateProjectPopup.propTypes = {
  project: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCloseProjectModal: PropTypes.func.isRequired,
  showCreateProjectModal: PropTypes.func.isRequired,
  getProjectVisibilityTypes: PropTypes.func.isRequired,
  vType: PropTypes.string.isRequired,
};

CreateProjectPopup = reduxForm({
  form: 'createProjectForm',
  enableReinitialize: true,
  onSubmit,
})(CreateProjectPopup);

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  getProjectVisibilityTypes: () => dispatch(visibilityTypes()),
});

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.project.selectedProject
      ? state.project.selectedProject.name
      : null,
    description: state.project.selectedProject
      ? state.project.selectedProject.description
      : null,
    vType: state.project.selectedProject?.organization_visibility_type_id
      ? state.project.selectedProject?.organization_visibility_type_id
      : null,
  },
  isLoading: state.project.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateProjectPopup),
);
