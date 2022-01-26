import React from 'react';
import { useSelector } from 'react-redux';
// import img from '../../assets/images/icon-folder.svg';
import './style.scss';

const Heading = () => {
  const { name } = useSelector((state) => state.organization.activeOrganization);
  return (
    <div className="main-heading">
      <div className="secand-heading">
        <h2>
          Manage&nbsp;
          {name}
          &nbsp;Organization
        </h2>
      </div>
    </div>
  );
};
export default Heading;
