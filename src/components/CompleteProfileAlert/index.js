import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';

function CompleteProfileAlert() {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  function dateDiffInDays(dateStored) {
    const previousDate = new Date(dateStored);
    const todaysDate = new Date();
    const diffTime = Math.abs(todaysDate - previousDate);
    const diffDays = Math.ceil(diffTime / (_MS_PER_DAY));
    return diffDays;
  }
  const time = localStorage.getItem('alertclosetime');
  let flag;
  if (!time) {
    flag = true;
  } else if (dateDiffInDays(time) > 7) {
    flag = true;
    localStorage.removeItem('alertclosetime');
  } else {
    flag = false;
  }
  const [display, setDisplay] = useState(flag);
  const hideAlert = () => {
    setDisplay(false);
    const date = new Date();
    // const day = date.getDate();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    // localStorage.setItem('alertclosetime', `${day}/${month + 1}/${year}`);
    localStorage.setItem('alertclosetime', date);
  };
  return (
    <div>
      <Alert className="alert" variant="warning" style={{ display: display ? 'block' : 'none' }}>
        <FontAwesomeIcon className="close" icon="window-close" onClick={hideAlert} />
        Your organization name is missing in the profile, Kindly go to My Account to update your
          &nbsp;
        <Link className="goto-button" to="/studio/account">profile info.</Link>
      </Alert>
    </div>
  );
}

export default CompleteProfileAlert;
