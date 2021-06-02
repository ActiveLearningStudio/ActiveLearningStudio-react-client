import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../assets/images/home.png';
import arrow from '../../assets/images/slide-arrow.png';

const Bradecrumd = () => (
  <div className="bradecrumd">
    <ul>
      <li>
        <Link className="link-1" to="#">
          <img className="home-logo" src={home} alt="home-logo" />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="#">
          <img src={arrow} alt="slide-arrow" />
          <span className="span-text">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="#">
          <img src={arrow} alt="slide-arrow" />
          <span className="span-text">Manage Organization</span>
        </Link>
      </li>
    </ul>
  </div>
    );
export default Bradecrumd;
