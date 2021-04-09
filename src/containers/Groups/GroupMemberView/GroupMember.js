import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

function GroupMember(props) {
  const {
    groupId,
    authUser,
    removingUserId,
    selected,
    user: {
      id,
      first_name: firstName,
      last_name: lastName,
      invited_email: iEmail,
      role,
      projects = [],
    },
    selectMe,
    deselectMe,
    removeMember,
    permission,
  } = props;

  const handleRemove = useCallback(() => {
    removeMember(groupId, id, iEmail)
      .then(() => {
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove user.',
        });
      });
  }, [groupId, iEmail, id, removeMember]);

  return (
    <>
      <div className="col-md-12 member-item">
        <div className="member-name-mark">
          <span>{`${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`}</span>
        </div>

        <div className="member-info">
          <h2 className="member-name">
            {`${firstName || ''} ${lastName || ''}`}
            {!(firstName && lastName) ? iEmail : ''}
          </h2>

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

        {authUser.role === 'owner' && authUser.id !== id && (
          <div className="button-container">
            {iEmail && (
              <button
                type="button"
                className={classnames('invite-btn', { checked: true })}
                disabled
              >
                <FontAwesomeIcon icon="check" className="mr-2" />
                <span>Invited</span>
              </button>
            )}
            {permission?.Group?.includes('group:remove-user') && (
              <button
                type="button"
                className="eliminate-btn"
                disabled={removingUserId}
                onClick={handleRemove}
              >
                <FontAwesomeIcon icon="plus" className="mr-2" />
                <span>{authUser.id === id ? 'Leave' : 'Remove'}</span>

                {removingUserId === id && (
                  <FontAwesomeIcon icon="spinner" className="spinner" />
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="member-project-dialog" onBlur={deselectMe}>
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

GroupMember.propTypes = {
  groupId: PropTypes.number.isRequired,
  authUser: PropTypes.object.isRequired,
  removingUserId: PropTypes.number,
  selected: PropTypes.bool,
  user: PropTypes.object.isRequired,
  permission: PropTypes.object.isRequired,
  selectMe: PropTypes.func.isRequired,
  deselectMe: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

GroupMember.defaultProps = {
  selected: false,
  removingUserId: null,
};

export default GroupMember;
