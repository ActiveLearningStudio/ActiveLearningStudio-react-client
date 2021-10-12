import React, { useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteNotification } from 'store/actions/notification';

import './style.scss';

const NotificationArea = (props) => {
  const { content, type } = props;
  const dispatch = useDispatch();
  const notificationText = useRef();
  let userNameImg = '';
  let firstLetter = '';
  let lastLetter = '';

  if (content.notifiable) {
    if (content.notifiable.first_name) {
      [firstLetter] = content.notifiable.first_name;
    }
    if (content.notifiable.last_name) {
      [lastLetter] = content.notifiable.last_name;
    }
    userNameImg = firstLetter + lastLetter;
  }
  useEffect(() => {
    if (notificationText.current) {
      notificationText.current.innerHTML = content.data?.message;
    }
  }, [content.data]);

  return (
    <>
      {content.data?.message && (
        <div className="notification-area">
          <div className="user-detail">
            {/* <img src={flashCards} alt="" /> */}
            <div className="user-icons">{userNameImg.toUpperCase()}</div>
            <p ref={notificationText} />
          </div>

          <div className="settings-notification">
            {type === 'header' && (
              <Dropdown className="pull-right playlist-dropdown check">
                <Dropdown.Toggle className="playlist-dropdown-btn">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(deleteNotification(content.id))}>
                    <FontAwesomeIcon icon="times-circle" className="mr-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="timer">
              {content.created_at}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

NotificationArea.propTypes = {
  content: PropTypes.object,
  type: PropTypes.string,
};

NotificationArea.defaultProps = {
  content: {},
  type: '',
};

export default NotificationArea;
