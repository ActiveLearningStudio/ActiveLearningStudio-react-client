import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { EmailIcon, EmailShareButton } from 'react-share';

const ShareProject = ({ url, projectName, onClose }) => (
  <>
    <h1>
      Your can now share project
      {' '}
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
      </div>
    </h1>
    <hr />

    <div className="margin-bottom-20">
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
    </div>

    <div className="margin-bottom-20">
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
    </div>

    <div className="close-btn">
      <button type="button" onClick={onClose}>Ok</button>
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

ShareProject.propTypes = {
  url: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShareProject;
