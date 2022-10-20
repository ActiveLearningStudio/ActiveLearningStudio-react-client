/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Badge } from 'react-bootstrap';
import * as actionTypes from 'store/actionTypes';
import resourceService from 'services/resource.service';
import { deleteResourceAction } from 'store/actions/resource';
import ResourceCardDropdown from './ResourceCardDropdown';
import { toast } from 'react-toastify';

import './style.scss';

const ResourceCard = (props) => {
  const {
    resource,
    playlist,
    match,
    index,
    teamPermission,
    handleShow,
    setProjectId,
    setProjectPlaylistId,
    setProjectPlaylistActivityId,
    setselectedProjectPlaylistName,
    setselectedPlaylistActivityName,
    // wizard,
  } = props;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const parser = new DOMParser();
  let resourceTitle = parser.parseFromString(resource.metadata && resource.metadata.title !== undefined ? resource.metadata.title : resource.title, 'text/html').body.textContent;
  return (
    <Draggable key={resource.id} draggableId={`${resource.id}`} index={index}>
      {(provided) => (
        <div className="playlist-resource playlist-resource-bg" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="resource-card-wrapper d-flex align-items-center">
            {!!resource.thumb_url && (
              <div className="activity-thumb-wrapper">
                {/* <Link to={`/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}> */}
                <div
                  className="activity-thumb"
                  style={{
                    backgroundImage: !resource.thumb_url?.includes('/storage/') ? `url(${resource.thumb_url})` : `url(${global.config.resourceUrl}${resource.thumb_url})`,
                  }}
                />
                {/* </Link> */}
              </div>
            )}

            <div className="title" style={{ flex: 1 }}>
              <Link
                className="playlist-resource-title"
                onClick={async () => {
                  toast.dismiss();
                  toast.info('Loading Activity ...', {
                    className: 'project-loading',
                    closeOnClick: false,
                    closeButton: false,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 10000,
                    icon: '',
                  });
                  const result = await resourceService.activityH5p(resource.id);
                  toast.dismiss();

                  dispatch({
                    type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                    payload: result.activity?.source_type ? 'addvideo' : 'addactivity',
                    playlist: playlist,
                    project: match.params.projectId,
                    activity: result.activity,
                  });
                  if (result.activity?.source_type) {
                    dispatch({
                      type: 'SET_ACTIVE_VIDEO_SCREEN',
                      payload: result.activity,
                    });
                  }
                }}
                title={resourceTitle}
              >
                {resourceTitle}
              </Link>
            </div>
            {/* {resource.shared && (
              <Badge pill variant="success" className="p-1">
                Shared
              </Badge>
            )} */}
            <div className="activity-options-wrapper check">
              <ResourceCardDropdown
                resource={resource}
                playlist={playlist}
                teamPermission={teamPermission || {}}
                previewPage="buildPreview"
                handleShow={handleShow}
                setProjectId={setProjectId}
                setProjectPlaylistId={setProjectPlaylistId}
                setProjectPlaylistActivityId={setProjectPlaylistActivityId}
                setselectedProjectPlaylistName={setselectedProjectPlaylistName}
                setselectedPlaylistActivityName={setselectedPlaylistActivityName}
                // wizard
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

ResourceCard.propTypes = {
  resource: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
  deleteResource: PropTypes.func.isRequired,
  teamPermission: PropTypes.object.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setProjectPlaylistId: PropTypes.func.isRequired,
  setProjectPlaylistActivityId: PropTypes.func.isRequired,
  // wizard: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (projectId, activityId) => dispatch(deleteResourceAction(projectId, activityId)),
});

export default withRouter(connect(null, mapDispatchToProps)(ResourceCard));
