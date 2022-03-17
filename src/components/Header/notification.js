/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import bell from "assets/images/bellon.svg";

import {
  getAllNotifications,
  clearAllNotification,
} from "store/actions/notification";
import NotificationArea from "containers/Notification/NotificationArea";

import "./style.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

function HeaderNotification() {
  const dispatch = useDispatch();
  const allNotifications = useSelector((state) => state.notification);
  const auth = useSelector((state) => state.auth);

  const [notificationData, setNotificationData] = useState([]);
  const [errorNotification, setErrorNotification] = useState("");
  const organization = useSelector((state) => state.organization);
  useEffect(() => {
    if (auth?.user) {
      dispatch(getAllNotifications());
    }
  }, [auth?.user, dispatch]);

  useEffect(() => {
    if (notificationData.yesterday) {
      if (
        notificationData.today.length === 0 &&
        notificationData.yesterday.length === 0 &&
        notificationData.older.length === 0
      ) {
        setErrorNotification("Currently no Notifications are available.");
      }
    }
  }, [notificationData]);

  useEffect(() => {
    setNotificationData(allNotifications.notification);
  }, [allNotifications]);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <li className="notification-bar">
      <Dropdown>
        <Dropdown.Toggle
          className="d-flex align-items-center"
          id="dropdown-autoclose-outside"
        >
          <div
            className="notification-alert"
            onClick={() => dispatch(clearAllNotification())}
          >
            {/* <img src={bell} alt="notification" /> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.2514 8.40096C17.2514 6.96854 16.6981 5.59478 15.7134 4.5819C14.7286 3.56903 13.3931 3 12.0004 3C10.6078 3 9.27219 3.56903 8.28745 4.5819C7.30271 5.59478 6.74949 6.96854 6.74949 8.40096C6.74949 14.7021 4.12402 16.5024 4.12402 16.5024H19.8768C19.8768 16.5024 17.2514 14.7021 17.2514 8.40096Z"
                stroke={primaryColor}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.5144 20.1025C13.3605 20.3754 13.1397 20.6018 12.8739 20.7592C12.6082 20.9166 12.307 20.9995 12.0003 20.9995C11.6937 20.9995 11.3925 20.9166 11.1267 20.7592C10.861 20.6018 10.6402 20.3754 10.4863 20.1025"
                stroke={primaryColor}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="header-icon-text">Notifications</p>
            {allNotifications.notificationAlert > 0 && (
              <div className="alert-added" />
            )}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="user-dropdown">
          <div className="scroll-notification">
            <div className="header-data">
              <h2>Notifications</h2>
            </div>
            {notificationData.today &&
              Object.keys(notificationData.today).length > 0 && (
                <>
                  <div className="notification-status"> Today </div>
                  {notificationData.today.map((msg) => (
                    <a key={msg.id}>
                      <NotificationArea content={msg} />
                    </a>
                  ))}
                </>
              )}

            {notificationData.yesterday &&
              Object.keys(notificationData.yesterday).length > 0 && (
                <>
                  <div className="notification-status"> Yesterday </div>
                  {notificationData.yesterday.map((msg) => (
                    <a key={msg.id}>
                      <NotificationArea content={msg} />
                    </a>
                  ))}
                </>
              )}

            {notificationData.older &&
              Object.keys(notificationData.older).length > 0 && (
                <>
                  <div className="notification-status"> Older </div>
                  {notificationData.older.map((msg) => (
                    <a key={msg.id}>
                      <NotificationArea content={msg} />
                    </a>
                  ))}
                </>
              )}
            {errorNotification && (
              <div className="error-notification">{errorNotification}</div>
            )}
          </div>
          <div className="btn-all-notification">
            <Dropdown.Item
              className="all-notification"
              as={Link}
              to={`/org/${organization.currentOrganization?.domain}/notification`}
            >
              See all notifications
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}

export default HeaderNotification;
