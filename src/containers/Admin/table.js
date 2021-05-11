/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
//import { useHistory } from 'react-router-dom';
import {
  deleteUserFromOrganization, updateFeedbackScreen, updateOrganizationScreen, updatePreviousScreen,


 
 
  deleteOrganization,
  
 
} from 'store/actions/organization';
import { Link, withRouter } from 'react-router-dom';
import { simpleSearchAction } from 'store/actions/search';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { setActiveAdminForm, setCurrentUser } from 'store/actions/admin';

function Table(props) {
  
  const {tableHead,history, data, type, activePage, setActivePage, searchAlertToggler } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, allSuborgList } = organization;
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
  //const history = useHistory();
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
              <Link style={{ float: 'left' }} onClick={() =>{
                  dispatch(setCurrentUser(user));
                  dispatch(setActiveAdminForm('edit_user'));
                }}>
                  Edit
                </Link>
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
          {type === 'Organization' && allSuborgList?.map((row) => (
            <tr className="org-rows">
              <td><img src={global.config.resourceUrl+row.image} alt="" /></td>
              <td>{row.name}</td>
              <td>{row.domain}</td>
              <td>{row.admins.length}<div className="view-all">view all</div></td>
              <td>{row.projects_count}
                <div
                  className="view-all"
                  onClick={async () => {
                    Swal.fire({
                      html: 'Searching...', 
                      allowOutsideClick: false,
                      onBeforeOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    await dispatch(simpleSearchAction({
                      from: 0,
                      size: 20,
                      type: 'orgSearch',
                    }));
                    Swal.close();
                    //history.push(`/org/${row?.domain}/search?type=orgSearch`);
                  }}
                >
                  view all
                </div>
              </td>
              <td>{row.suborganization_count}<div className="view-all">view all</div></td>
              <td>{row.users_count}<div className="view-all">view all</div></td>
              <td>{row.groups_count}<div className="view-all">view all</div></td>
              <td>{row.teams_count}<div className="view-all">view all</div></td>
              <td>
              <Link style={{ float: 'left' }}>
                  Edit
                </Link>
                <Link
                  style={{ float: 'right' }}
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!',
                    }).then(async (result) => {
                      
                      if (result.isConfirmed) {
                        Swal.showLoading()
                        const resultDel = await dispatch(deleteOrganization(row));
                        if (resultDel) {
                          Swal.fire({
                          
                            text: "You have successfully deleted the organization",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#084892',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK',
                          })
                          

                        }
                      }
                    });
                  }}
                >Delete</Link>
              </td>

            </tr>
          ))}
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

export default withRouter(Table);
