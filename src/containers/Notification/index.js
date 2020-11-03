import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useSelector } from 'react-redux';

import NotificationArea from './NotificationArea';

import './style.scss';

const Notification = (props) => {
  const allNotifications = useSelector((state) => state.notification);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    setNotificationData(allNotifications.notification);
  }, [allNotifications]);

  return (
    <>
      <Header {...props} />
      <div className="main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="notification-wapper">
            {notificationData.map((msg) => <NotificationArea content={msg} type="header" />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
