/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import {
  deleteUserFromOrganization, updateFeedbackScreen, updateOrganizationScreen, updatePreviousScreen,
} from 'store/actions/organization';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

function Table(props) {
  const {tableHead, data, type, activePage, setActivePage, searchAlertToggler } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const dispatch = useDispatch();
  const handleDeleteUser = (user) => {
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
        const response = dispatch(deleteUserFromOrganization(user?.id));
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
    <div className="table-data">
      <table>
        <thead>
          {tableHead?.map((head) => <th>{head}</th>)}
        </thead>
        <tbody>
          {type === 'Stats' && data?.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>{row.project}</td>
              <td>{row.counter}</td>
              <td>{row.flow}</td>
            </tr>
          ))}
          {type === 'Users' && (data?.data?.length > 0 ? data?.data.map((user) => (
            <tr>
              <td>{user.organization_joined_at ? user.organization_joined_at : 'NA'}</td>
              <td>{user.first_name ? user.first_name : 'NA'}</td>
              <td>{user.last_name ? user.last_name : 'NA'}</td>
              <td>{user.email ? user.email : 'NA'}</td>
              <td>{activeOrganization?.name ? activeOrganization?.name : 'NA'}</td>
              <td>{user.organization_type ? user.organization_type : 'NA'}</td>
              <td>{user.organization_role ? user.organization_role : 'NA'}</td>
              <td>
                <Link style={{ float: 'left' }}> Edit </Link>
                <Link style={{ float: 'right' }} onClick={() => handleDeleteUser(user)}>Delete</Link>
              </td>
            </tr>
          )) :
            searchAlertToggler === 0 ?
            (<tr>
              <td colspan="8">
                <Alert variant="warning">No User Found</Alert>
              </td>
            </tr>)
             :
             (<tr>
               <td colspan="8">
                <Alert variant="primary">Loading...</Alert>
               </td>
             </tr>)
          )}
        </tbody>
      </table>
      <div className="pagination-top">
        <div className="pagination_state">
          Showing {data?.meta?.from} to {data?.meta?.to} of {data?.meta?.total} results
        </div>
        <div class="main-pagination">
          {type === 'Users'
          &&
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              setActivePage(e);
            }}
          />
          }
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data:PropTypes.object.isRequired,
};

export default Table;
