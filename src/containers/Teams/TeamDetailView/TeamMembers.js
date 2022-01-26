import { React } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TeamMembers = (props) => {
  const {
    arrayToRender,
    toggleLeft,
    roles,
    setSelectUsersNewTeam,
    roleChangeHandler,
    deleteTeamMemberHandler,
  } = props;
  return (
    <>
      {arrayToRender?.map((element) => (
        <div className="right_card">
          <div className="right_info">
            <div>
              <div className="member-name-mark">
                <span>{`${element?.first_name ? element?.first_name[0] : ''}${element?.last_name ? element?.last_name[0] : ''}`}</span>
              </div>
            </div>
            <div className={`${toggleLeft ? 'none' : ''}`}>
              <h6>{`${element?.first_name} ${element?.last_name}`}</h6>
              <p>{element?.email}</p>
            </div>
          </div>
          <div className={`${toggleLeft ? 'none' : ''} right_label`}>
            <div className="filter-dropdown-role-team">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {element?.role?.name || roles?.filter((role) => role.id === element.role_id)[0].name}
                  <FontAwesomeIcon icon="chevron-down" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {roles?.map((role) => (
                    <Dropdown.Item
                      onClick={() => {
                        if (element.role_id) {
                          const newRoleArray = arrayToRender?.filter((value) => {
                            if (value.role_id === element.role_id) {
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
            </div>
            <div className="delete-team-member" onClick={() => deleteTeamMemberHandler(element)}>
              <FontAwesomeIcon icon="trash-alt" />
            </div>
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
  setSelectUsersNewTeam: PropTypes.func.isRequired,
  roleChangeHandler: PropTypes.func.isRequired,
  deleteTeamMemberHandler: PropTypes.func.isRequired,
};
export default TeamMembers;
