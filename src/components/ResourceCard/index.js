import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import { shareActivity } from 'store/actions/resource';
// import ShareLink from './ShareLink';

import './style.scss';

// TODO: need to convert to functional component
// need to clean up attribute, remove template functions
const ResourceCard = (props) => {
  const handleDelete = (e) => {
    e.preventDefault();

    const { resource, showDeletePopup } = props;
    // eslint-disable-next-line react/destructuring-assignment

    showDeletePopup(resource.id, resource.title, 'Activity');
  };

  const {
    resource, playlist, match, index,
  } = props;

  return (
    <Draggable key={resource.id} draggableId={`${resource.id}`} index={index}>
      {(provided) => (
        <div
          className="playlist-resource"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="resource-card-wrapper">
            {!!resource.thumb_url && (
              <div className="activity-thumb-wrapper">
                <Link
                  to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}
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

            <div>
              <div className="title">
                <Link
                  to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}
                >
                  {resource.metadata && resource.metadata.title !== undefined
                    ? resource.metadata.title
                    : resource.title}
                </Link>
              </div>
            </div>

            <div className="activity-options-wrapper check">
              <div className="activity-options">
                <div className="dropdown pull-right">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Link
                        className="dropdown-item"
                        to={`/playlist/preview/${playlist.id}/resource/${resource.id}`}
                      >
                        <FontAwesomeIcon className="mr-2" icon="eye" />
                        Preview
                      </Link>

                      <Link
                        className="dropdown-item"
                        to={`/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}
                      >
                        <FontAwesomeIcon className="mr-2" icon="pen" />
                        Edit
                      </Link>

                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={async () => {
                          shareActivity(resource.id);
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
                                  href={`/shared/activity/${resource.id}`}
                                  rel="noopener noreferrer"
                                >
                                  <input
                                    id="urllink_clip"
                                    value={`${protocol + window.location.host}/shared/activity/${resource.id}`}
                                  />
                                </a>

                                <span
                                  title="copy to clipboard"
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
                                >
                                  <FontAwesomeIcon icon="clipboard" />
                                </span>
                                <br />

                                <div className="close-btn">
                                  <button type="button" onClick={onClose}>
                                    Ok
                                  </button>
                                </div>
                              </div>
                            ),
                          });
                        }}
                      >
                        <FontAwesomeIcon className="mr-2" icon="share" />
                        Share
                      </Dropdown.Item>

                      <Dropdown.Item
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
                        <FontAwesomeIcon className="mr-2" icon="times-circle" />
                        Executable
                      </Dropdown.Item>

                      <Dropdown.Item className="dropdown-item" onClick={handleDelete}>
                        <FontAwesomeIcon className="mr-2" icon="times-circle" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="clearfix" />
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
  index: PropTypes.string.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
});

export default withRouter(connect(null, mapDispatchToProps)(ResourceCard));
