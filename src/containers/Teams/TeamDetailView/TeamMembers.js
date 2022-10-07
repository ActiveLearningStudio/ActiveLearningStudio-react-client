/* eslint-disable eqeqeq */
/* eslint-disable  */
import { React } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const TeamMembers = (props) => {
  const { arrayToRender, toggleLeft, roles, teamPermission, setSelectUsersNewTeam, roleChangeHandler, deleteTeamMemberHandler } = props;
  const { newTeam } = useSelector((state) => state.team);
  return (
    <>
      {arrayToRender?.map((element) => (
        <div className="right_card">
          <div className="right_info">
            <div>
              {!toggleLeft ? (
                <div className="member-name-mark">
                  <span>{`${element?.first_name ? element?.first_name[0] : ''}${element?.last_name ? element?.last_name[0] : ''}`}</span>
                </div>
              ) : (
                <div className="hover-memeber">
                  <div className="member-information">
                    <h6>{`${element?.first_name} ${element?.last_name}`}</h6>
                    <p>{element?.email}</p>
                  </div>
                  <div className="member-name-mark-hover">
                    <span>{`${element?.first_name ? element?.first_name[0] : ''}${element?.last_name ? element?.last_name[0] : ''}`}</span>
                  </div>
                </div>
              )}
            </div>
            <div className={`${toggleLeft ? 'none' : ''}`}>
              <h6>{`${element?.first_name} ${element?.last_name}`}</h6>
              <p>{element?.email}</p>
            </div>
          </div>
          <div className={`${toggleLeft ? 'none' : ''} right_label`}>
            <div className="filter-dropdown-role-team">
              {(teamPermission?.Team?.includes('team:remove-team-user') || teamPermission?.Team?.includes('team:add-team-user') || newTeam?.name) && (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {element?.role?.name || roles?.filter((role) => role.id == element.role_id)[0]?.name}
                    <FontAwesomeIcon icon="chevron-down" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {roles?.map((role) => (
                      <Dropdown.Item
                        onClick={() => {
                          if (element.role_id) {
                            const newRoleArray = arrayToRender?.filter((value) => {
                              if (value.id === element.id) {
                                // eslint-disable-next-line no-param-reassign
                                value.role_id = role.id;
                                return value;
                              }
                              return value;
                            });
                            setSelectUsersNewTeam(newRoleArray);
                          } else if (element?.role?.id) {
                            roleChangeHandler(role.id, element.id);
                          }
                        }}
                      >
                        {role.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            {(teamPermission?.Team?.includes('team:remove-team-user') || newTeam?.name) && (
              <div
                className="delete-team-member"
                // onClick={() => deleteTeamMemberHandler(element)}
                onClick={() => {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Do you want to delete this member?',
                    showDenyButton: true,

                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteTeamMemberHandler(element);
                      Swal.fire('Deleted', '', 'success');
                    } else if (result.isDenied) {
                    }
                  });
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
TeamMembers.propTypes = {
  arrayToRender: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  toggleLeft: PropTypes.bool.isRequired,
  teamPermission: PropTypes.object.isRequired,
  setSelectUsersNewTeam: PropTypes.func.isRequired,
  roleChangeHandler: PropTypes.func.isRequired,
  deleteTeamMemberHandler: PropTypes.func.isRequired,
};
export default TeamMembers;
