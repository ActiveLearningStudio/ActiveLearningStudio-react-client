import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TeamMember(props) {
  const {
    authUser,
    user: {
      id,
      first_name: firstName,
      last_name: lastName,
      role,
      projects = [],
    },
    selectMe,
    deselectMe,
    selected,
  } = props;

  return (
    <>
      <div className="col-md-12 member-item">
        <div className="member-name-mark">
          <span>{`${firstName[0]}${lastName[0]}`}</span>
        </div>

        <div className="member-info">
          <h2 className="member-name">{`${firstName} ${lastName}`}</h2>

          <div className="member-data d-flex align-items-center">
            <h2 className="m-0">
              {role === 'owner' && (
                <>
                  <span>Admin</span>
                  <span style={{ margin: '0 9px' }}>●</span>
                </>
              )}
              {`Assigned to ${projects.length} Projects`}
            </h2>

            {projects.length > 0 && (
              <div className="collapse-btn" onClick={selected ? deselectMe : selectMe}>
                <button type="button">
                  <FontAwesomeIcon icon={selected ? 'caret-up' : 'caret-down'} className="mr-2" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="button-container">
          <button type="button" className="eliminate-btn">
            <FontAwesomeIcon icon="plus" className="mr-2" />
            <span>{authUser.id === id ? 'Leave' : 'Remove'}</span>
          </button>
        </div>
      </div>

      {selected && (
        <div className="invite-dialog" onBlur={deselectMe}>
          <div onClick={deselectMe}>
            <FontAwesomeIcon icon="plus" className="mr-2" />
          </div>
          {projects.map((project, index) => (
            <h2 key={project.id} className={`${index > 0 ? 'border-top' : ''}`}>
              {project.name}
            </h2>
          ))}
        </div>
      )}
    </>
  );
}

TeamMember.propTypes = {
  authUser: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  user: PropTypes.object.isRequired,
  selectMe: PropTypes.func.isRequired,
  deselectMe: PropTypes.func.isRequired,
};

TeamMember.defaultProps = {
  selected: false,
};

export default TeamMember;
