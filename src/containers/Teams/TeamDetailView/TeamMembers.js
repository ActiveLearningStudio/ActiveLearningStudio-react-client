import { React } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TeamMembers = (props) => {
  const {
    arrayToRender,
    toggleLeft,
    roles,
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
                  {element?.role?.name}
                  <FontAwesomeIcon icon="chevron-down" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {roles?.map((role) => (
                    <Dropdown.Item>
                      {role.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="delete-team-member">
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
};
export default TeamMembers;
