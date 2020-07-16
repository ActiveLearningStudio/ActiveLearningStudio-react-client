import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: these files does not exist
// import youtubeImg from 'assets/images/social-media.svg';
// import placeholderImg from 'assets/images/interface.svg';
// import listImg from 'assets/images/signs.svg';
import logo from 'assets/images/logo.svg';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
// import ShareLink from './ShareLink';

import './style.scss';

// TODO: need to convert to functional component
// need to clean up attribute, remove template functions
class ResourceCard extends React.Component {
  handleDelete = (e) => {
    e.preventDefault();

    const { resource, showDeletePopup } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    showDeletePopup(
      resource._id,
      resource.title,
      'Activity',
    );
  };

  render() {
    const {
      resource,
      playlist,
      match,
      index,
    } = this.props;

    return (
      <Draggable
        key={resource._id}
        draggableId={resource._id}
        index={index}
      >
        {(provided) => (
          <div
            className="playlist-resource"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="resource-card-wrapper">
              {resource.metadata && resource.metadata.thumbUrl && (
                <div className="activity-thumb-wrapper">
                  <Link to={`/playlist/preview/${playlist._id}/resource/${resource._id}`}>
                    <div
                      className="activity-thumb"
                      style={{
                        backgroundImage: `url(${global.config.laravelAPIUrl}${resource.metadata.thumbUrl})`,
                      }}
                    />
                  </Link>
                </div>
              )}

              <div
                className={
                  resource.metadata && resource.metadata.thumbUrl
                    ? 'activity-thumb-content'
                    : 'activity-thumb-content'
                }
              >
                <div className="title">
                  <Link to={`/playlist/preview/${playlist._id}/resource/${resource._id}`}>
                    {resource.metadata && resource.metadata.title !== undefined
                      ? resource.metadata.title
                      : resource.title}
                  </Link>
                </div>
                {/*
                <div className="social-icons-tray">
                  <Link to="">
                    <img src={placeholderImg} alt="" />
                  </Link>
                  <Link to="">
                    <img src={youtubeImg} alt="" />
                  </Link>
                  <Link to="">
                    <img src={listImg} alt="" />
                  </Link>
                </div>
                */}
              </div>

              <div className="activity-options-wrapper check">
                <div className="activity-options">
                  <div className="dropdown pull-right">
                    <button
                      className="btn project-dropdown-btn"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </button>

                    <div className="dropdown-menu">
                      <Link
                        className="dropdown-item"
                        to={`/playlist/preview/${playlist._id}/resource/${resource._id}`}
                      >
                        <FontAwesomeIcon icon="eye" />
                        {' '}
                        Preview
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={
                          `/project/${match.params.projectId}/playlist/${playlist._id}/activity/create/${resource._id}`
                        }
                      >
                        <FontAwesomeIcon icon="pencil" />
                        {' '}
                        Edit
                      </Link>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          Swal({
                            title: 'STAY TUNED!',
                            text: 'COMING SOON',
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="share" />
                        {' '}
                        Send To
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          Swal({
                            title: 'STAY TUNED!',
                            text: 'COMING SOON',
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="cloud-download" />
                        {' '}
                        Executable
                      </a>
                      <a className="dropdown-item" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon="times-circle-o" />
                        {' '}
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix" />
            </div>

            {/*
            <div className="row timestamp">
              <div className="col-md-12">
                <p>
                  {new Date(resource.created_at).toDateString()}
                </p>
              </div>
            </div>
            */}
          </div>
        )}
      </Draggable>
    );
  }
}

ResourceCard.propTypes = {
  resource: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(ResourceCard),
);
