import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Badge } from 'react-bootstrap';

import { deleteResourceAction } from 'store/actions/resource';
import ResourceCardDropdown from './ResourceCardDropdown';

import './style.scss';

const ResourceCard = (props) => {
  const {
    resource,
    playlist,
    match,
    index,
    teamPermission,
    // wizard,
  } = props;
  const organization = useSelector((state) => state.organization);
  return (
    <Draggable key={resource.id} draggableId={`${resource.id}`} index={index}>
      {(provided) => (
        <div
          className="playlist-resource"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="resource-card-wrapper d-flex align-items-center">
            {!!resource.thumb_url && (
              <div className="activity-thumb-wrapper">
                <Link
                  to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}
                >
                  <div
                    className="activity-thumb"
                    style={{
                      backgroundImage: resource.thumb_url.includes('pexels.com')
                        ? `url(${resource.thumb_url})`
                        : `url(${global.config.resourceUrl}${resource.thumb_url})`,
                    }}
                  />
                </Link>
              </div>
            )}

            <div className="title" style={{ flex: 1 }}>
              <Link to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}>
                {resource.metadata && resource.metadata.title !== undefined
                  ? resource.metadata.title
                  : resource.title}
              </Link>
            </div>
            {resource.shared && (
              <Badge pill variant="success" className="p-1">
                Shared
              </Badge>
            )}
            <div className="activity-options-wrapper check">
              <ResourceCardDropdown
                resource={resource}
                playlist={playlist}
                teamPermission={teamPermission || {}}
                previewPage="buildPreview"
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
  // wizard: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (projectId, activityId) => dispatch(deleteResourceAction(projectId, activityId)),
});

export default withRouter(connect(null, mapDispatchToProps)(ResourceCard));
