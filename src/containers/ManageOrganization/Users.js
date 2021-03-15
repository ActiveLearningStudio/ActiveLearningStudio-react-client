import React from 'react';
import UserCirlce from 'assets/images/UserCircle2.png';

function UserRow() {
  return (
    <>
      <div className="user-row">
        <img src={UserCirlce} alt="user_image" />
        <div className="main-column">
          <div className="username">
            Leo Cunha
          </div>
          <div className="others">
            leocunhna@curriki.org
          </div>
          <div className="third-row user-role">
            Role: Moderator
          </div>
        </div>
        <div className="main-column">
          <div className="others">
            Organization: 4
          </div>
          <div className="others">
            Groups: 4
          </div>
        </div>
        <div className="main-column">
          <div className="others">
            Teams: 4
          </div>
          <div className="others">
            Projects: 4
          </div>
        </div>
        <div className="main-column">
          <a href="#">Edit</a>
        </div>
        <div className="main-column">
          <a href="#">Delete</a>
        </div>
      </div>
      <hr />
    </>
  );
}
function Users() {
  return (
    <div>
      <div className="create-user-row">
        <h5 className="users-heading">
          Users
        </h5>
        <button type="button" className="newuser-button">
          <div className="button-text">
            New User
          </div>
        </button>
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
      <UserRow />
      <UserRow />
      <div className="flex">
        <h5 className="users-in-my-organization">All Users in My Organization</h5>
        <hr />
      </div>
      <UserRow />
      <UserRow />
    </div>
  );
}

export default Users;
