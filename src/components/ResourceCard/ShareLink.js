/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Publish from "../../assets/images/menu-publish.svg";

import { getProjectCourseFromLMSPlaylist } from "store/actions/project";
import { getProjectId, googleShare } from "store/actions/gapi";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

function ShareLink(props) {
  const dispatch = useDispatch();

  const {
    projectId,
    playlistId,
    gcr_playlist_visibility,
    handleShow,
    setProjectId,
    setProjectPlaylistId,
    setProjectPlaylistActivityId,
  } = props;

  const AllLms = useSelector((state) => state.share);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <li className="dropdown-submenu send">
      <a
        href="#"
        className="test"
        tabIndex="-1"
        onClick={() => {
          if (allLms.shareVendors && allLms.shareVendors.length === 0) {
            Swal.fire({
              icon: "info",
              // eslint-disable-next-line max-len
              title:
                "You don't have a Learning Management Systems set up for publishing. Please contact us to get this configured.",
            });
          }
        }}
      >
        {/* <img src={Publish} alt="Preview" className="menue-img" /> */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="menue-img"
        >
          <path
            d="M10.583 4.52941C11.5495 4.52941 12.333 3.73933 12.333 2.76471C12.333 1.79009 11.5495 1 10.583 1C9.61651 1 8.83301 1.79009 8.83301 2.76471C8.83301 3.73933 9.61651 4.52941 10.583 4.52941Z"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.41602 8.5631C4.38251 8.5631 5.16602 7.77302 5.16602 6.7984C5.16602 5.82378 4.38251 5.03369 3.41602 5.03369C2.44952 5.03369 1.66602 5.82378 1.66602 6.7984C1.66602 7.77302 2.44952 8.5631 3.41602 8.5631Z"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.583 13.0001C11.5495 13.0001 12.333 12.21 12.333 11.2354C12.333 10.2608 11.5495 9.4707 10.583 9.4707C9.61651 9.4707 8.83301 10.2608 8.83301 11.2354C8.83301 12.21 9.61651 13.0001 10.583 13.0001Z"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.27148 7.96411L9.06593 10.3722"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.06037 3.72876L5.27148 6.13683"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
                      dispatch(
                        getProjectCourseFromLMSPlaylist(
                          playlistId,
                          data.id,
                          data.lms_name.toLowerCase(),
                          data.lms_url,
                          projectId
                        )
                      );
                    }}
                  >
                    {data.site_name}
                  </a>
                </li>
              )
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
