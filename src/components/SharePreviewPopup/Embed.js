import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

const Embed = ({
 url, projectName, playlistName = null, onClose,
}) => (
  <>
    <h1>
      You can embed below html snippet for
      {' '}
      <strong>
        &quot;
        {playlistName || projectName}
        &quot;
      </strong>
      <br />
    </h1>

    <div className="d-flex align-items-center justify-content-between">
      <input id="urllink_clip_iframe" readOnly value={`<iframe src="${url}" width="100%" height="600"></iframe>`} />

      <FontAwesomeIcon
        title="Copy to clipboard"
        icon="clipboard"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          const copyText = document.getElementById('urllink_clip_iframe');

          copyText.focus();
          copyText.select();
          copyText.setSelectionRange(0, 99999); /* For mobile devices */

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
    <div className="share-popup-btn">
      <div className="close-btn">
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </>
);

Embed.propTypes = {
  url: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Embed;
