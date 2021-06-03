import React from 'react';
import img from '../../assets/images/project80.png';
import './style.scss';

const Heading = () => (
  <div className="main-heading">
    <p>Nevda Department of Education</p>
    <div className="secand-heading">
      <img src={img} alt="logo" />
      <h2>Manage Organization</h2>
    </div>
  </div>
  );
export default Heading;
