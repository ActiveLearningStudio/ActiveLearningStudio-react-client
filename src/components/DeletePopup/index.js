import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { FadeDiv } from 'utils';

import './style.scss';

// TODO: need to clean up attribute
function DeletePopup(props) {
  const {
    ui,
    selectedProject,
    hideDeletePopup,
    deleteProject,
    deletePlaylist,
    deleteResource,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      hideDeletePopup(event);
    }
  }, [hideDeletePopup]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const deleteEntity = useCallback((deleteType, id) => () => {
    if (deleteType === 'Project') {
      deleteProject(id);
    } else if (deleteType === 'Playlist') {
      deletePlaylist(selectedProject.id, id);
    } else if (deleteType === 'Activity') {
      deleteResource(id);
    }
  }, [selectedProject, deleteProject, deletePlaylist, deleteResource]);

  return (
    <FadeDiv className="popup">
      <div className="modal fade" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>{`Delete "${ui.title}"?`}</h5>
              <p>
                {`You're about to permanently delete this ${ui.deleteType} and all of its data.`}
              </p>
              <p>Do you want to continue?</p>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-sm btn-danger"
                onClick={deleteEntity(ui.deleteType, ui.id)}
              >
                Delete
              </button>

              <button
                type="button"
                className="btn btn-sm btn-default"
                data-dismiss="modal"
                onClick={hideDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeDiv>
  );
}

DeletePopup.propTypes = {
  ui: PropTypes.object.isRequired,
  selectedProject: PropTypes.object,
  hideDeletePopup: PropTypes.func.isRequired,
  deleteProject: PropTypes.func,
  deletePlaylist: PropTypes.func,
  deleteResource: PropTypes.func,
};

DeletePopup.defaultProps = {
  selectedProject: null,
  deleteProject: () => {},
  deletePlaylist: () => {},
  deleteResource: () => {},
};

export default DeletePopup;
