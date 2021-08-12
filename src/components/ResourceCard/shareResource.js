/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import { shareActivity } from 'store/actions/resource';

const ResourceCardDropdownShare = (props) => {
  const { resource } = props;

  return (
    <Dropdown.Item
      onClick={() => {
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
                href={`/studio/activity/${resource.id}/shared`}
                rel="noopener noreferrer"
              >
                <input
                  id="urllink_clip"
                  value={`${protocol + window.location.host}/studio/activity/${resource.id}/shared`}
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
      <FontAwesomeIcon icon="share" className="mr-2" />
      Share
    </Dropdown.Item>
  );
};

ResourceCardDropdownShare.propTypes = {
  resource: PropTypes.object.isRequired,
};

export default ResourceCardDropdownShare;
