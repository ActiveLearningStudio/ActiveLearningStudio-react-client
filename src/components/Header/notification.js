import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import notificationImg from 'assets/images/notification.png';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NotificationArea from 'containers/Notification/notificationArea';
import { getAllnotification, clearAllNotification } from 'store/actions/notification';

import './style.scss';

function HeaderNotification() {
  const dispatch = useDispatch();
  const allNotifications = useSelector((state) => state.notification);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    if (allNotifications.notification.length === 0) {
      dispatch(getAllnotification());
    }
  }, [allNotifications.notification.length, dispatch]);

  useEffect(() => {
    setNotificationData(allNotifications.notification);
  }, [allNotifications]);

  return (
    <li className="notification-bar">
      <Dropdown>
        <Dropdown.Toggle className="d-flex align-items-center">
          <div className="notification-alert" onClick={() => dispatch(clearAllNotification())}>
            <img src={notificationImg} alt="notification" />
            {allNotifications.notificationAlert && <div className="alert-added" />}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="user-dropdown">
          <div className="scroll-notification">
            <div className="header-data">
              <h2>Notifications</h2>
              <h3>Mark all as read</h3>
            </div>
            {notificationData.map((msg) => (
              <Dropdown.Item key={msg.id}>
                <NotificationArea content={msg} />
              </Dropdown.Item>
            ))}
          </div>
          <div className="btn-all-notification">
            <Dropdown.Item className="all-notification" as={Link} to="/notification">

              see All notification
            </Dropdown.Item>
            <Dropdown.Item className="notification-setting" as={Link} to="/notification">
              <FontAwesomeIcon icon="cog" className="mr-2" />
              settings
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}

export default HeaderNotification;
