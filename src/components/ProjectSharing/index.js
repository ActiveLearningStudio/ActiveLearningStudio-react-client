/* eslint-disable max-len */
/* eslint-disable */
import React from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import {
  toggleProjectShareAction,
  toggleProjectShareRemovedAction,
} from "store/actions/project";
import "./style.scss";
import SharePreviewPopup from "components/SharePreviewPopup";
// import linkIcon from 'assets/images/project-link.svg';
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const ProjectSharing = (props) => {
  const { activeShared, selectedProject, setActiveShared } = props;
  const dispatch = useDispatch();
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className="share-button">
      <Switch
        onChange={() => {
          if (activeShared) {
            Swal.fire({
              icon: "warning",
              title: `You are about to stop sharing <strong>"${selectedProject.name}"</strong>`,
              html: `Please remember that anyone you have shared this project
                                    with will no longer have access its contents. Do you want to continue?`,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText: "Stop Sharing!",
              confirmButtonAriaLabel: "Stop Sharing!",
              cancelButtonText: "Cancel",
              cancelButtonAriaLabel: "Cancel",
            }).then((resp) => {
              if (resp.isConfirmed) {
                dispatch(
                  toggleProjectShareRemovedAction(
                    selectedProject.id,
                    selectedProject.name
                  )
                );
                setActiveShared(false);
              } else if (resp.isDismissed || resp.dismiss) {
                setActiveShared(false);
                setActiveShared(true);
              }
            });
          } else {
            dispatch(
              toggleProjectShareAction(selectedProject.id, selectedProject.name)
            );
            setActiveShared(true);
          }
        }}
        checked={activeShared || false}
        className="react-switch"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#888"
        onColor={primaryColor}
        onHandleColor={primaryColor}
        offHandleColor="#666"
      />
      &nbsp;
      <span style={{ marginLeft: "18px" }}>
        {activeShared ? "Disable Sharing" : "Enable Sharing"}
      </span>
      {activeShared && (
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            if (window.gapi && window.gapi.sharetoclassroom) {
              window.gapi.sharetoclassroom.go("croom");
            }
            const protocol = `${window.location.href.split("/")[0]}//`;
            const url = `${protocol}${window.location.host}/project/${selectedProject.id}/shared`;
            return SharePreviewPopup(url, selectedProject.name);
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="32"
              viewBox="0 0 24 32"
              fill="none"
              css-inspector-installed="true"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z"
                fill="white"
              />
              <path
                d="M10.1899 16.906C10.5786 17.4262 11.0746 17.8566 11.644 18.168C12.2135 18.4795 12.8433 18.6647 13.4905 18.7111C14.1378 18.7575 14.7875 18.664 15.3955 18.437C16.0035 18.21 16.5557 17.8547 17.0144 17.3953L19.7298 14.6772C20.5541 13.8228 21.0103 12.6785 21 11.4907C20.9897 10.303 20.5137 9.16675 19.6746 8.32683C18.8356 7.48692 17.7005 7.01049 16.5139 7.00017C15.3273 6.98985 14.1842 7.44646 13.3307 8.27165L11.7739 9.82094"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8101 15.094C13.4214 14.5738 12.9255 14.1434 12.356 13.832C11.7865 13.5205 11.1567 13.3353 10.5095 13.2889C9.86218 13.2425 9.2125 13.336 8.60449 13.563C7.99648 13.7901 7.44435 14.1453 6.98557 14.6048L4.27025 17.3228C3.44589 18.1772 2.98974 19.3215 3.00005 20.5093C3.01036 21.6971 3.48631 22.8333 4.32538 23.6732C5.16445 24.5131 6.29951 24.9895 7.48609 24.9999C8.67267 25.0102 9.81583 24.5536 10.6694 23.7284L12.2171 22.1791"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="textinButton">Get link</span>
        </button>
      )}
    </div>
  );
};
ProjectSharing.propTypes = {
  activeShared: PropTypes.bool.isRequired,
  selectedProject: PropTypes.object.isRequired,
  setActiveShared: PropTypes.func.isRequired,
};

export default ProjectSharing;
