import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';

function CompleteProfileAlert() {
  const time = localStorage.getItem('alertclosetime');
  let flag;
  if (!time) {
    flag = true;
  } else {
    flag = false;
  }
  const [display, setDisplay] = useState(flag);
  const hideAlert = () => {
    setDisplay(false);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    localStorage.setItem('alertclosetime', `${day}/${month + 1}/${year}`);
  };
  return (
    <div>
      <Alert className="alert" variant="warning" style={{ display: display ? 'block' : 'none' }}>
        <FontAwesomeIcon className="close" icon="window-close" onClick={hideAlert} />
        Your organization name is missing in profile, Kindly Goto My Account to update your profile info.
          &nbsp;
        <Link className="goto-button" to="/account">Go to My Account</Link>
      </Alert>
    </div>
  );
}

export default CompleteProfileAlert;
