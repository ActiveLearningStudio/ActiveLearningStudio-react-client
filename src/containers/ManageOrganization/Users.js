import React, { useState, useMemo } from 'react';
import {
  Dropdown,
  InputGroup,
  Button,
  Alert,
} from 'react-bootstrap';
import {
  getOrgUsers,
  getRoles,
  searchUserInOrganization,
} from 'store/actions/organization';
import SearchButton from 'assets/images/Vector.png';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import AddUser from './addUser';
import UserRow from './UserRow';

function Users() {
  const dispatch = useDispatch();
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const allListState = useSelector((state) => state.organization);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const { activeOrganization, permission } = allListState;
  const searchUsers = async (query, page) => {
    Swal.showLoading();
    const result = await dispatch(searchUserInOrganization(activeOrganization?.id, query, page));
    Swal.close();
    if (result.data.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'User Not Found',
        icon: 'warning',
      });
      setSearchQuery('');
      setUsers(allListState?.users);
    } else {
      setUsers(result);
    }
    return result;
  };
  const onChangeHandler = async ({ target }) => {
    if (target.value) {
      setSearchQuery(target.value);
    } else {
      setSearchQuery('');
      setUsers(allListState?.users);
    }
  };
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
      {permission?.user?.includes('user:view') ? (
        <>
          <div className="create-user-row">
            <h5 className="users-heading">
              Users
            </h5>
            {permission?.organization?.includes('organization:add-user') && (
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
            )}
          </div>
          <div className="user-top-row">
            <InputGroup className="find-user">
              <input placeholder="Find User" className="input-field" value={searchQuery} onChange={onChangeHandler} />
              <InputGroup.Append>
                <Button variant="outline" onClick={() => searchUsers(searchQuery, activePage)}>
                  <img src={SearchButton} alt="search_button" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {/* <div className="filter-sub-organization"> Filter Users by Sub-Organization</div> */}
            {/* <div className="filter-by-role"> Filter Users by Role</div> */}
          </div>
          <div className="flex">
            <h5 className="user-created-me">Users Created by Me</h5>
            <hr />
          </div>
          {users?.data?.length > 0 ? users.data.map((user) => (
            <UserRow user={user} />
          )) : null}
          <Pagination
            activePage={activePage}
            itemsCountPerPage={users?.meta?.per_page}
            totalItemsCount={users?.meta?.total}
            pageRangeDisplayed={5}
            onChange={(e) => {
              setActivePage(e);
            }}
          />
        </>
      ) : <Alert variant="danger">You are not authorized to view all users.</Alert>}
    </div>
  );
}

export default Users;
