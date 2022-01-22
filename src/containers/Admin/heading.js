import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

const Heading = () => {
  const name = useSelector((state) => state.organization?.activeOrganization?.name);
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
