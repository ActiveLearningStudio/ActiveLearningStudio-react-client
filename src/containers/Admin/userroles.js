/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

function UserRoles() {
  const [parentCat, setParentCat] =  useState(['organizations', 'Projects', 'Playlists', 'Acivities', 'Team']);
  const [childCat, setChildCat] =  useState(['view', 'update', 'upload', 'create', 'edit','publish']);
  return (
    <div className="user-roles">
      <h2>Permissions</h2>
      <div className="box-group">
        <div className="top-cat">
          <h3>All Permissions</h3>
          <ul>
            {parentCat.map((data) => <li>{data}</li>)}
          </ul>
        </div>
        <div className="child-cat">
          <div className="all-cat">
            {childCat.map((data) => (
              <div className="form-grouper">
                <input type="checkbox" name="" />
                <label>{data}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="config">
          <div className="btn-config">
            <button className="btn-update">
              Update Role
            </button>
            <button className="btn-del">
              Delete Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

UserRoles.propTypes = {
  // manage: PropTypes.object.isRequired,
  // type:PropTypes.string.isRequired,
};

export default UserRoles;
