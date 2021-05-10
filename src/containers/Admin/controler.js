/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveAdminForm } from 'store/actions/admin';
import searchimg from 'assets/images/search-icon.png';
import csv from 'assets/images/csv.png';
import pdf from 'assets/images/pdf.png';
import bulk from 'assets/images/bulk.png';
import AddUser from 'containers/ManageOrganization/addUser';
import { getRoles } from 'store/actions/organization';

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
    roles,
    inviteUser, 
  } = props;
  const dispatch = useDispatch();
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const adminState = useSelector((state) => state.admin);
  const [activeRole, setActiveRole] =  useState('');
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const { activeForm } = adminState;
  useMemo(() => {
    dispatch(getRoles());
  },[])

  useEffect(() => {
    roles?.length > 0 && setActiveRole(roles[0]?.name)
  }, [roles]);
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
              {activeRole}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              
                {roles?.map((head) => (
                  <div className="group">
                    <Dropdown.Item 
                      onClick={() => setActiveRole(head.name)}
                    >
                      {head.name}
                    </Dropdown.Item>
                  </div>
                ))}
              
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
      {!!btnText && organization?.activeRole !== 'superadmin' && (
        <div className="btn-text">
          <button onClick={() => {
            if (btnAction === 'add_activity_type') {
              dispatch(setActiveAdminForm('add_activity_type'))
            } else if (btnAction === 'add_role') {
              dispatch(setActiveAdminForm('add_role'))
            } else if (btnAction === 'create_user') {
              dispatch(setActiveAdminForm('create_user'))
            } else if (btnAction === 'add_org') {
              dispatch(setActiveAdminForm('add_org'))
            }
            
          }}
          >
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
      {!!inviteUser && (permission?.activeRole === 'admin' || permission?.activeRole === 'superadmin') &&
        <div className="btn-text">
          <div className="add-user-btn">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Invite User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <AddUser
                  setAllUsersAdded={setAllUsersAdded}
                  allUsersAdded={allUsersAdded}
                  method="create"
                  />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      }
    </div>
  );
}

// Pills.propTypes = {
//   manage: PropTypes.object.isRequired,
//   type:PropTypes.string.isRequired,
// };

export default Controller;
