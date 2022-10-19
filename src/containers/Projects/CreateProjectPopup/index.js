/* eslint-disable */
import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import SelectImage from 'utils/SelectImage';
import loader from 'assets/images/loader.svg';

import { required, maxLength } from 'utils';

import { createProjectAction, uploadProjectThumbnail, uploadProjectThumbnailAction, showCreateProjectModalAction, visibilityTypes } from 'store/actions/project';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';

import { addActivityPlaylistSearch, moveActivityPlaylist } from 'store/actions/playlist';
import './style.scss';
import { clonePlaylist, cloneActivity } from 'store/actions/search';

import { getMediaSources } from 'store/actions/admin';

const maxLength80 = maxLength(80);
const maxLength1000 = maxLength(1000);

let imageValidation = '';
const projectShare = true;

const onSubmit = async (values, dispatch, props) => {
  const { history, thumbUrl, activity, project, searchView, fromTeam, addtoProject, selectedProjectstoAdd, selectedTeam, handleCloseProjectModal, currentOrganization } = props;

  const { name, description } = values;
  var result;
  if (addtoProject) {
    Swal.fire({
      title: 'Are you sure you want to move these activities?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'yes',
      customClass: {
        confirmButton: 'confirmation-close-btn',
      },
    }).then(async (res) => {
      if (res.isConfirmed) {
        result = await dispatch(
          createProjectAction({
            name,
            description,
            is_public: projectShare,
            organization_visibility_type_id: 1,
            team_id: fromTeam && selectedTeam ? selectedTeam?.id : null,
            // eslint-disable-next-line max-len
            thumb_url:
              project.thumbUrl ||
              thumbUrl ||
              project.selectedProject.thumb_url ||
              'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
          }),
        );
        if (result) {
          if (searchView) {
            if (activity.clone.model == 'Playlist') {
              clonePlaylist(result.id, activity.clone?.id);
            } else if (activity.ind) {
              dispatch(addActivityPlaylistSearch(activity.clone?.id, result.playlists[0].id));
            } else {
              cloneActivity(result.playlists[0].id, activity.clone?.id);
            }
            Swal.fire({
              title: 'Your request is being processed.',
              text: 'Please refresh after a moment.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'confirmation-close-btn',
              },
            });
            history.push(`/org/${currentOrganization?.currentOrganization?.domain}/project/${result.id}`);
          } else {
            dispatch(moveActivityPlaylist(result.playlists[0].id, selectedProjectstoAdd));
            Swal.fire({
              title: 'Your request is being processed.',
              text: 'Please refresh after a moment.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'confirmation-close-btn',
              },
            });
            history.push(`/org/${currentOrganization?.currentOrganization?.domain}/project/${result.id}`);
          }

          // selectedProjectstoAdd?.map((id) => {
          //   dispatch(addActivityPlaylistSearch(id, result.playlists[0].id));
          // });
        }
      }
    });
  } else {
    result = await dispatch(
      createProjectAction({
        name,
        description,
        is_public: projectShare,
        organization_visibility_type_id: 1,
        team_id: fromTeam && selectedTeam ? selectedTeam?.id : null,
        // eslint-disable-next-line max-len
        thumb_url:
          project.thumbUrl ||
          thumbUrl ||
          project.selectedProject.thumb_url ||
          'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
      }),
    );
    if (handleCloseProjectModal) {
      handleCloseProjectModal(false);
    }
    history.push(`/org/${currentOrganization?.currentOrganization?.domain}/project/${result.id}`);
  }
};
export const uploadThumb = async (e, permission, teamPermission, id, dispatch, typeUpload = 'FILE_UPLOAD') => {
  const formData = new FormData();
  try {
    if (typeUpload === 'DRAG_DROP') {
      formData.append('thumb', e[0]);
    } else {
      formData.append('thumb', e.target.files[0]);
    }
    // formData.append('thumb', e.target.files[0]);
    if (id) {
      formData.append('project_id', id);
    }
    imageValidation = '';
    const result = await dispatch(uploadProjectThumbnailAction(formData));
    return result;
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      // eslint-disable-next-line max-len
      text:
        permission?.Project?.includes('project:upload-thumb') || teamPermission?.Team?.includes('team:view-project')
          ? 'Image upload failed, kindly try again'
          : 'You do not have permission to upload image',
    });
  }
};

let CreateProjectPopup = (props) => {
  const { isLoading, project, thumbUrl, handleSubmit, addtoProject, handleCloseProjectModal, getProjectVisibilityTypes, vType } = props;

  const dispatch = useDispatch();
  const stateHeader = useSelector((state) => state.organization);
  const projectState = useSelector((state) => state.project);
  const { teamPermission } = useSelector((state) => state.team);
  const { permission, activeOrganization } = stateHeader;

  const [mediaSources, setMediaSources] = useState([]);

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
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
  useMemo(() => {
    (async () => {
      const { data } = await getProjectVisibilityTypes();
      setVisibilityTypeArray(data.data);
    })();
  }, [getProjectVisibilityTypes]);

  useEffect(() => {
    if (mediaSources.length === 0) {
      const result = dispatch(getMediaSources(activeOrganization?.id));
      result.then((data) => {
        setMediaSources(data.mediaSources);
      });
    }
  }, [mediaSources]);

  return permission?.Project?.includes('project:create') ? (
    <div className="create-program-wrapper">
      <form className="create-playlist-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="project-name">
          <Field
            name="name"
            component={InputField}
            type="text"
            validate={[required, maxLength80]}
            autoComplete="new-password"
            className="reduxlabel"
            label="Project Name"
            placeholder="e.g Course Name"
          />
        </div>

        <div className="project-description">
          <Field name="description" component={TextareaField} validate={[required, maxLength1000]} autoComplete="new-password" label="What is your project about?" />
        </div>

        <SelectImage
          image={
            project.thumbUrl ||
            thumbUrl ||
            project.selectedProject.thumb_url ||
            'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280'
          }
          returnImage={(e) => uploadThumb(e, permission, teamPermission, projectState?.selectedProject?.id, dispatch)}
          returnImageDragDrop={(e) => uploadThumb(e, permission, teamPermission, projectState?.selectedProject?.id, dispatch, 'DRAG_DROP')}
          returnImagePexel={(e) => dispatch(uploadProjectThumbnail(e))}
        />
        <div className="create-project-template-wrapper">
          <button type="submit" className="create-project-submit-btn" disabled={isLoading}>
            {isLoading ? <img src={loader} alt="" /> : addtoProject ? 'Save Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Alert style={{ marginTop: '25px' }} variant="danger">
      You are not authorized to access this.
    </Alert>
  );
};

CreateProjectPopup.propTypes = {
  project: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCloseProjectModal: PropTypes.func.isRequired,
  showCreateProjectModal: PropTypes.func.isRequired,
  getProjectVisibilityTypes: PropTypes.func.isRequired,
  vType: PropTypes.string,
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
    name: state.project.selectedProject ? state.project.selectedProject.name : null,
    description: state.project.selectedProject ? state.project.selectedProject.description : null,
    vType: state.project.selectedProject?.organization_visibility_type_id ? state.project.selectedProject?.organization_visibility_type_id : null,
  },
  isLoading: state.project.isLoading,
  selectedTeam: state.team.selectedTeam,
  currentOrganization: state.organization,
});

export default React.memo(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProjectPopup)));
