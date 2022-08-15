/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Publish from '../../assets/images/menu-publish.svg';

import { getProjectCourseFromLMSPlaylist } from 'store/actions/project';
import { getProjectId, googleShare } from 'store/actions/gapi';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import PublishSmSvg from 'iconLibrary/dropDown/PublishSmSvg';

function ShareLink(props) {
  const dispatch = useDispatch();

  const { projectId, playlistId, gcr_playlist_visibility, handleShow, setProjectId, setProjectPlaylistId, setProjectPlaylistActivityId } = props;

  const AllLms = useSelector((state) => state.share);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <li className="dropdown-submenu send">
      <a
        href="#"
        className="test"
        tabIndex="-1"
        onClick={() => {
          if (allLms.shareVendors && allLms.shareVendors.length === 0) {
            Swal.fire({
              icon: 'info',
              // eslint-disable-next-line max-len
              title: "You don't have a Learning Management Systems set up for publishing. Please contact us to get this configured.",
            });
          }
        }}
      >
        <PublishSmSvg primaryColor={primaryColor} className="menue-img" />
        Publish
      </a>

      <ul className="dropdown-menu check">
        {gcr_playlist_visibility && (
          <li
            onClick={() => {
              handleShow();
              getProjectId(projectId);
              setProjectId(projectId);
              setProjectPlaylistId(playlistId);
              setProjectPlaylistActivityId(0);
              dispatch(googleShare(false));
            }}
          >
            <a>Google Classroom</a>
          </li>
        )}
        {allLms.shareVendors &&
          allLms.shareVendors.map(
            (data) =>
              data.playlist_visibility && (
                <li key={data.id}>
                  <a
                    href="#"
                    onClick={async () => {
                      dispatch(getProjectCourseFromLMSPlaylist(playlistId, data.id, data.lms_name.toLowerCase(), data.lms_url, projectId));
                    }}
                  >
                    {data.site_name}
                  </a>
                </li>
              ),
          )}
      </ul>
    </li>
  );
}

ShareLink.propTypes = {
  projectId: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
};

export default ShareLink;
