import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// import flashCards from 'assets/images/flash-cards.png';

const NotificationArea = (props) => {
  const { content, type } = props;

  return (
    <div className="notification-area">
      <div className="user-detail">
        {/* <img src={flashCards} alt="" /> */}
        <div className="user-icons">MQ</div>
        <p>{!!content.data && content.data.message}</p>
      </div>

      <div className="settings-notification">
        {type === 'header' && (
          <Dropdown className="pull-right playlist-dropdown check">
            <Dropdown.Toggle className="playlist-dropdown-btn">
              <FontAwesomeIcon icon="ellipsis-v" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon="times-circle" className="mr-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <div className="timer">
          20 min
        </div>
      </div>
    </div>
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
