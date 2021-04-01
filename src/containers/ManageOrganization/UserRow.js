import React from 'react';
import UserCirlce from 'assets/images/UserCircle2.png';
import PropTypes from 'prop-types';
import {
  deleteUserFromOrganization, updateFeedbackScreen, updateOrganizationScreen, updatePreviousScreen,
} from 'store/actions/organization';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function UserRow(props) {
  const allListState = useSelector((state) => state.organization);
  const { permission } = allListState;
  const dispatch = useDispatch();
  const { user } = props;
  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this User?',
      text: 'This action is Irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#084892',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const response = dispatch(deleteUserFromOrganization(userId));
        response.then(() => {
          dispatch(updateFeedbackScreen({ action: 'user:delete', name: `${user?.first_name} ${user?.last_name}` }));
          dispatch(updateOrganizationScreen('feedback'));
          dispatch(updatePreviousScreen('Users'));
        }).catch((e) => {
          console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User Deletion failed, kindly try again.',
          });
        });
      }
    });
  };
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
        {permission?.user?.includes('user:edit') && (
          <div className="secondary-column">
            {/* <Link href="#">Edit</Link> */}
          </div>
        )}
        {permission?.user?.includes('user:delete') && (
          <div className="secondary-column">
            <Link onClick={() => handleDelete(user?.id)}>Delete</Link>
          </div>
        )}
      </div>
      <hr />
    </>
  );
}
UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};
