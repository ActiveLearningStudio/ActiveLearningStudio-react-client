/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { toggleProjectShareAction, toggleProjectShareRemovedAction } from 'store/actions/project';
const ShareProject = ({ url, projectName, onClose }) => {
  // const [activeShared, setActiveShared] = useState(true);
  return (
    <>
      <h1>
        Your can now share project{' '}
        <strong>
          &quot;
          {projectName}
          &quot;
        </strong>
        <br />
        Anyone with the link below can access your project:
        <div className="mt-3 d-flex align-items-center justify-content-between">
          <a target="_blank" href={url} rel="noopener noreferrer">
            <input id="urllink_clip" readOnly value={url} />
          </a>

          <FontAwesomeIcon
            title="Copy to clipboard"
            icon="clipboard"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const copyText = document.getElementById('urllink_clip');

              copyText.focus();
              copyText.select();

              document.execCommand('copy');
              Swal.fire({
                title: 'Link Copied',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false,
              });
            }}
          />
        </div>
      </h1>
      {/* <hr /> */}

      {/* <div className="margin-bottom-20">
      <span>
        <div id="croom" className="d-flex align-items-center">
          <div
            className="g-sharetoclassroom"
            data-size="32"
            data-url={url}
          >
            Loading Classroom...
          </div>
          <span className="margin-left-20 inline-block">
            Share this project on Google Classroom
          </span>
        </div>
      </span>
    </div> */}

      {/* <div className="margin-bottom-20">
      <span>
        <EmailShareButton
          url={url}
          subject={projectName}
          className="email-share"
        >
          <EmailIcon size={32} />
        </EmailShareButton>
      </span>
      <span className="margin-left-20 inline-block">
        Share this project through email
      </span>
    </div> */}
      <div className="share-popup-btn">
        <div className="close-btn">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        {/* <div className="close-btn">
          <button
            type="button"
            onClick={() => {
              if (activeShared) {
                Swal.fire({
                  icon: 'warning',
                  title: `You are about to stop sharing <strong>"${projectName}"</strong>`,
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
                    dispatch(toggleProjectShareRemovedAction(Project_id, projectName));
                  }
                });
              } else {
                dispatch(toggleProjectShareAction(Project_id, projectName));
              }
            }}
          >
            Stop Sharing
          </button>
        </div> */}
      </div>

      <div className="google-script">
        {setTimeout(() => {
          if (window.gapi && window.gapi.sharetoclassroom) {
            window.gapi.sharetoclassroom.go('croom');
          }
        }, 1)}
      </div>
    </>
  );
};

ShareProject.propTypes = {
  url: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  Project_id: PropTypes.number.isRequired,
  dispatcher: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ShareProject;
