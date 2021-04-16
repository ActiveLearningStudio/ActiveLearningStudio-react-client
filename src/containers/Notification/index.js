import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import NotificationArea from './NotificationArea';

import './style.scss';

const Notification = () => {
  const allNotifications = useSelector((state) => state.notification);
  const [notificationData, setNotificationData] = useState([]);
  const [errorNotification, setErrorNotification] = useState('');

  useEffect(() => {
    setNotificationData(allNotifications.notification);
  }, [allNotifications]);

  useEffect(() => {
    if (notificationData.yesterday) {
      if (notificationData.today.length === 0 && notificationData.yesterday.length === 0 && notificationData.older.length === 0) {
        setErrorNotification('Currently no notifications are available.');
      }
    }
  }, [notificationData]);

  return (
    <>
      <div>
        <div className="content-wrapper">
          <div className="notification-wapper">
            {notificationData.today && Object.keys(notificationData.today).length > 0
              && (
              <>
                <div className="notification-status"> Today </div>
                {notificationData.today.map((msg) => (
                  <NotificationArea key={msg.id} content={msg} type="header" />
                ))}
              </>
              )}
          </div>

          <div className="notification-wapper">
            {notificationData.yesterday && Object.keys(notificationData.yesterday).length > 0
              && (
              <>
                <div className="notification-status"> Yesterday </div>
                {notificationData.yesterday.map((msg) => (
                  <NotificationArea key={msg.id} content={msg} type="header" />
                ))}
              </>
              )}
          </div>

          <div className="notification-wapper">
            {notificationData.older && Object.keys(notificationData.older).length > 0
              && (
              <>
                <div className="notification-status"> Older </div>
                {notificationData.older.map((msg) => (
                  <NotificationArea key={msg.id} content={msg} type="header" />
                ))}
              </>
              )}
          </div>
          {errorNotification && <div className="error-notification">{errorNotification}</div> }
        </div>
      </div>
    </>
  );
};

export default Notification;
