import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
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
      resource.id,
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
        key={resource.id}
        draggableId={`${resource.id}`}
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
                  <Link to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}>
                    <div
                      className="activity-thumb"
                      style={{
                        backgroundImage:
                          resource.metadata.thumbUrlType === 'pexels'
                            ? `url(${resource.metadata.thumbUrl})`
                            : `url(${global.config.laravelAPIUrl}${resource.metadata.thumbUrl})`,
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
                  <Link to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}>
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
                        to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}
                      >
                        <FontAwesomeIcon icon="eye" />
                        {' '}
                        Preview
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={
                          `/project/${match.params.projectId}/playlist/${playlist.id}/activity/create/${resource.id}`
                        }
                      >
                        <FontAwesomeIcon icon="pen" />
                        {' '}
                        Edit
                      </Link>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          confirmAlert({
                            customUI: ({ onClose }) => (
                              <div className="share-project-preview-url project-share-check">
                                <br />
                                <h3>
                                  You can now share Activity
                                  {' '}
                                  <strong>{resource.title}</strong>
                                  <br />
                                  Anyone with the link below can access your activity:
                                </h3>

                                <a
                                  target="_blank"
                                  href={`/shared/activity/${resource.id.trim()}`}
                                  rel="noopener noreferrer"
                                >
                                  <input
                                    id="urllink_clip"
                                    value={`${protocol + window.location.host}/shared/activity/${resource.id}`}
                                  />
                                </a>

                                <i
                                  title="copy to clipboard"
                                  className="fa fa-clipboard"
                                  aria-hidden="true"
                                  onClick={() => {
                                    /* Get the text field */
                                    const copyText = document.getElementById('urllink_clip');

                                    /* Select the text field */
                                    copyText.focus();
                                    copyText.select();
                                    // copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                                    /* Copy the text inside the text field */
                                    document.execCommand('copy');

                                    /* Alert the copied text */
                                    Swal.fire({
                                      title: 'Link Copied',
                                      showCancelButton: false,
                                      showConfirmButton: false,
                                      timer: 1500,
                                      allowOutsideClick: false,
                                    });
                                  }}
                                />
                                <br />

                                <div className="close-btn">
                                  <button type="button" onClick={onClose}>Ok</button>
                                </div>
                              </div>
                            ),
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="share" />
                        {' '}
                        Share
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          Swal.fire({
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
                        <FontAwesomeIcon icon="times-circle" />
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
