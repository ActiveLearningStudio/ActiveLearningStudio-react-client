import React from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import { toggleProjectShareAction, toggleProjectShareRemovedAction } from 'store/actions/project';
import './style.scss';
import SharePreviewPopup from 'components/SharePreviewPopup';
import linkIcon from 'assets/images/project-link.svg';

const ProjectSharing = (props) => {
  const { activeShared, selectedProject, setActiveShared } = props;
  const dispatch = useDispatch();
  return (
    <div className="share-button">
      <Switch
        onChange={() => {
          if (activeShared) {
            Swal.fire({
              icon: 'warning',
              title: `You are about to stop sharing <strong>"${selectedProject.name}"</strong>`,
              html: `Please remember that anyone you have shared this project
                                    with will no longer have access its contents. Do you want to continue?`,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText: 'Stop Sharing!',
              confirmButtonAriaLabel: 'Stop Sharing!',
              cancelButtonText: 'Cancel',
              cancelButtonAriaLabel: 'Cancel',
            }).then((resp) => {
              if (resp.isConfirmed) {
                dispatch(toggleProjectShareRemovedAction(selectedProject.id, selectedProject.name));
                setActiveShared(false);
              } else if (resp.isDismissed || resp.dismiss) {
                setActiveShared(false);
                setActiveShared(true);
              }
            });
          } else {
            dispatch(toggleProjectShareAction(selectedProject.id, selectedProject.name));
            setActiveShared(true);
          }
        }}
        checked={activeShared || false}
        className="react-switch"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#888"
        onColor="#ffca70"
        onHandleColor="#e89e21"
        offHandleColor="#666"
      />
      &nbsp;
      {activeShared ? 'Disable external link' : 'Enable Link'}
      {activeShared && (
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            if (window.gapi && window.gapi.sharetoclassroom) {
              window.gapi.sharetoclassroom.go('croom');
            }
            const protocol = `${window.location.href.split('/')[0]}//`;
            const url = `${protocol}${window.location.host}/project/${selectedProject.id}/shared`;
            return SharePreviewPopup(url, selectedProject.name);
          }}
        >

          <img src={linkIcon} alt="" className="mr-1" />
          <span className="textinButton">Get link</span>
        </button>
      )}
    </div>
  );
};
ProjectSharing.propTypes = {
  activeShared: PropTypes.bool.isRequired,
  selectedProject: PropTypes.object.isRequired,
  setActiveShared: PropTypes.func.isRequired,
};

export default ProjectSharing;
