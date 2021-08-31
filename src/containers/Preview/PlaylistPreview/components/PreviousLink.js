/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

function PreviousLink(props) {
  const {
    history,
    showLti,
    shared,
    projectId,
    playlistId,
    previousResource,
    allPlaylists,
  } = props;
  const organization = useSelector((state) => state.organization);
  const currentPlaylistIndex = allPlaylists.findIndex((p) => (p.id === playlistId));
  const prevPlaylist = currentPlaylistIndex > 0
    ? allPlaylists[currentPlaylistIndex - 1]
    : null;

  let prevLink = '#';
  if (previousResource) {
    prevLink = `/playlist/${playlistId}/activity/${previousResource.id}/preview`;
  } else if (prevPlaylist) {
    prevLink = `/playlist/${prevPlaylist.id}/preview`;
  }
  if (prevLink !== '#') {
    if (showLti) {
      prevLink += '/studio/lti';
    } else {
      prevLink = `/studio/org/${organization.currentOrganization?.domain}/project/${projectId}${prevLink}`;

      if (shared) {
        prevLink += '/studio/shared';
      }
    }
  }

  return (
    <div className="slider-hover-section">
      <Link to={prevLink}>
        <FontAwesomeIcon icon="chevron-left" />
      </Link>

      <div className={`hover-control-caption pointer-cursor${previousResource ? '' : ' no-data prev'}`}>
        {previousResource ? (
          <Link to={prevLink}>
            <div
              className="img-in-hover"
              style={{
                backgroundImage: previousResource.thumb_url
                  ? previousResource.thumb_url.includes('pexels.com')
                    ? `url(${previousResource.thumb_url})`
                    : `url(${global.config.resourceUrl}${previousResource.thumb_url})`
                  : 'url(data:image/jpeg;base64,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)',
              }}
            />
            <span>{previousResource.title}</span>
          </Link>
        ) : (
          <div className="slider-end">
            <p>Welcome! You are at the beginning of this playlist.</p>
            <Link
              to={prevLink}
              onClick={() => {
                if (!prevPlaylist) {
                  Swal.fire({
                    text: 'You are at the beginning of this project. Would you like to return to the project preview?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                  })
                    .then((result) => {
                      if (result.value) {
                        if (showLti) {
                          history.push(`/studio/project/${projectId}/shared`);
                        } else {
                          history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${projectId}/preview`);
                        }
                      }
                    });
                }
              }}
            >
              <FontAwesomeIcon icon="chevron-left" className="mr-2" />
              Switch to previous playlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

PreviousLink.propTypes = {
  history: PropTypes.object.isRequired,
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
  previousResource: PropTypes.object,
  allPlaylists: PropTypes.array,
};

PreviousLink.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
  previousResource: null,
  allPlaylists: [],
};

export default withRouter(PreviousLink);
