import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import UserCirlce from 'assets/images/UserCircle2.png';
import { Dropdown } from 'react-bootstrap';
import {
  getOrgUsers,
  getRoles,
} from 'store/actions/organization';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import AddUser from './addUser';

function UserRow(props) {
  const { user } = props;
  return (
    <>
      <div className="user-row">
        <img src={UserCirlce} alt="user_image" />
        <div className="main-column">
          <div className="username">
            {`${user.first_name} ${user.last_name}`}
          </div>
          <div className="others">
            {user.email}
          </div>
          <div className="third-row user-role">
            Role:
            {user.organization_role}
          </div>
        </div>
        <div className="main-column">
          <div className="others">
            Organization: 1
          </div>
          <div className="others">
            Groups:
            {user.default_organization.groups_count ? user.default_organization.groups_count : 0}
          </div>
        </div>
        <div className="main-column">
          <div className="others">
            Teams:
            {user.default_organization.teams_count ? user.default_organization.teams_count : 0}
          </div>
          <div className="others">
            Projects:
            {user.projects_count}
          </div>
        </div>
        <div className="secondary-column">
          <a href="#">Edit</a>
        </div>
        <div className="secondary-column">
          <a href="#">Delete</a>
        </div>
      </div>
      <hr />
    </>
  );
}
UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};
function Users() {
  const dispatch = useDispatch();
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const allListState = useSelector((state) => state.organization);
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const { activeOrganization } = allListState;
  useMemo(async () => {
    dispatch(getRoles());
    Swal.showLoading();
    const resultUsers = await dispatch(getOrgUsers(activeOrganization.id, activePage));
    Swal.close();
    setUsers(resultUsers);
    resultUsers.data.forEach((data) => {
      const allUsers = [];
      data.data?.map((adm) => {
        if (adm.organization_role !== 'Administrator') {
          const result = {
            value: {
              userInfo: adm,
            },
            role: {
              name: adm.organization_role,
              id: adm.organization_role_id,
            },
          };
          allUsers.push(result);
        }
        return true;
      });
      setAllUsersAdded(allUsers);
    });
  }, [activeOrganization.id, dispatch, activePage]);
  return (
    <div>
      <div className="create-user-row">
        <h5 className="users-heading">
          Users
        </h5>
        <Dropdown className="create-organizations">
          <Dropdown.Toggle id="dropdown-basic" className="newuser-button button-text">
            New User
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="data-input">
              <div className="form-group-create">
                <AddUser
                  setAllUsersAdded={setAllUsersAdded}
                  allUsersAdded={allUsersAdded}
                  method="update"
                />
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="user-top-row">
        <input placeholder="Find user" className="find-user" />
        <div className="filter-sub-organization"> Filter Users by Sub-Organization</div>
        <div className="filter-by-role"> Filter Users by Role</div>
      </div>
      <div className="flex">
        <h5 className="user-created-me">Users Created by Me</h5>
        <hr />
      </div>
      {users.data?.length > 0 ? users.data.map((user) => (
        <UserRow user={user} />
      )) : null}
      <Pagination
        activePage={activePage}
        itemsCountPerPage={users.meta?.per_page}
        totalItemsCount={users.meta?.total}
        pageRangeDisplayed={5}
        onChange={(e) => {
          setActivePage(e);
        }}
      />
      {/* <div className="flex">
        <h5 className="users-in-my-organization">All Users in My Organization</h5>
        <hr />
      </div> */}
    </div>
  );
}

export default Users;
