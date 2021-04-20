/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveAdminForm } from 'store/actions/admin';
import searchimg from 'assets/images/search-icon.png';
import csv from 'assets/images/csv.png';
import pdf from 'assets/images/pdf.png';
import bulk from 'assets/images/bulk.png';

function Controller(props) {
  const {
    paginationCounter,
    search,
    print,
    btnText,
    btnAction,
    importUser,
    filter,
    type,
    searchQuery,
    searchQueryChangeHandler,
    size,
    setSize,
    tableHead,
    roles
  } = props;
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const { activeForm } = adminState;
  return (
    <div className="controller">
      {paginationCounter && (
        <div className="pagination-counter drop-counter ">
          show:
          <span>
          <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic">
              {size}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSize(10)
                }}
              >
                10
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSize(25)
                }}
              >
                25
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSize(50)
                }}
              >
                50
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSize(100)
                }}
              >
                100
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </span>
          entries
        </div>
      )}
      {!!filter && (
        <div className="filter-dropdown drop-counter ">
          Fillter by:
          <span>
          <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic">
              Select value
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <form className="radio-filter">
                {tableHead?.map((head) => (
                  <div className="group">
                    <label>{head}</label>
                    <input type="checkbox" name="filter-table" />
                  </div>
                ))}
              </form>
            </Dropdown.Menu>
          </Dropdown>
          </span>
        </div>
      )}
      {roles?.length && (
        <div className="filter-dropdown drop-counter ">
          Select role:
          <span>
          <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic">
              Super Admin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <form className="radio-filter">
                {roles?.map((head) => (
                  <div className="group">
                    <label>{head}</label>
                    <input type="checkbox" name="filter-table" />
                  </div>
                ))}
              </form>
            </Dropdown.Menu>
          </Dropdown>
          </span>
        </div>
      )}
      {!!search && type === 'Users' && (
        <div className="search-bar">
          <input className="" type="text" placeholder="Search" value={searchQuery} onChange={searchQueryChangeHandler}/>
          <img src={searchimg} alt="search" />
        </div>
      )}
      {!!search && type === 'Stats' && (
        <div className="search-bar">
          <input className="" type="text" placeholder="Search" />
          <img src={searchimg} alt="search" />
        </div>
      )}
      {!!importUser && (
        <div className="import-user">
          <div className="img-section">
            <img src={bulk} alt="upload" />
          </div>
          <div>
            Import Users
          </div>
        </div>
      )}
      {!!print && (
        <div className="print-info">
          <div>
            print
          </div>
          <div className="img-section">
            <img src={csv} alt="csv" />
            <img src={pdf} alt="pdf" />
          </div>
        </div>
      )}
      {!!btnText && (
        <div className="btn-text">
          <button onClick={() => {
            if (btnAction === 'add_activity_type') {
              dispatch(setActiveAdminForm('add_activity_type'))
            } else if (btnAction === 'add_role') {
              dispatch(setActiveAdminForm('add_role'))
            } else if (btnAction === 'create_user') {
              dispatch(setActiveAdminForm('create_user'))
            }
          }}>
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
    </div>
  );
}

// Pills.propTypes = {
//   manage: PropTypes.object.isRequired,
//   type:PropTypes.string.isRequired,
// };

export default Controller;
