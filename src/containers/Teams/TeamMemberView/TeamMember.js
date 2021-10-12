import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserRole,
  getTeamPermission,
  loadTeamAction,
  loadTeamsAction,
} from 'store/actions/team';
import { useHistory } from 'react-router-dom';

function TeamMember(props) {
  const {
    teamId,
    authUser,
    removingUserId,
    selected,
    user: {
      id,
      first_name: firstName,
      last_name: lastName,
      invited_email: iEmail,
      email,
      projects = [],
      role,
    },
    selectMe,
    deselectMe,
    removeMember,
    teamPermission,
    // permission,
  } = props;
  const [activeRole, setActiveRole] = useState(role?.id);
  const { roles, teams } = useSelector((state) => state.team);
  const { activeOrganization } = useSelector((state) => state.organization);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const roleChangeHandler = async (roleId) => {
    setActiveRole(roleId);
    await dispatch(changeUserRole(teamId, { user_id: id, role_id: roleId }));
    await dispatch(loadTeamAction(teamId));
    await dispatch(getTeamPermission(activeOrganization?.id, teamId));
  };
  const handleRemove = useCallback(() => {
    const selectedTeam = teams.filter((filterTeam) => filterTeam.id === teamId);
    const reamainingAdmin = selectedTeam[0]?.users?.filter((singleRole) => singleRole?.role?.id === 1);
    if (reamainingAdmin?.length <= 1 && role.id === 1) {
      Swal.fire({
        icon: 'warning',
        text: 'There should be atleast one admin',
      });
    } else {
      removeMember(teamId, id, iEmail)
      .then(() => {
        if (id === auth.user.id) {
          history.push(`/org/${activeOrganization.domain}/teams`);
          dispatch(loadTeamsAction());
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove user.',
        });
      });
    }
  }, [removeMember, teamId, id, iEmail]);
  return (
    <>
      <div className="col-md-12 member-item">
        <div className="member-name-mark">
          <span>{`${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`}</span>
        </div>

        <div className="member-info">
          <h2 className="member-name">
            {`${firstName || ''} ${lastName || ''}`}
          </h2>
          <div>
            {email}
          </div>
          <div className="member-data d-flex align-items-center">
            <h2 className="m-0">
              {role?.name ? (
                <>
                  {role.name === 'admin' && <div style={{ color: 'green' }}> Admin </div>}
                  {role.name === 'contributor' && <div style={{ color: 'blue' }}> Contributor </div>}
                  {role.name === 'member' && <div style={{ color: 'red' }}> Member </div>}
                </>
              ) : null}
              {/* {`Assigned to ${projects.length} Projects`} */}
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
          {(teamPermission?.Team?.includes('team:remove-team-user')
          || teamPermission?.Team?.includes('team:add-team-user'))
          && auth.user.id !== id && (
            <div className="role-container">
              <select value={activeRole} onChange={(e) => roleChangeHandler(e.target.value)}>
                {roles?.map((roletype) => (
                  <option value={roletype.id} key={roletype.id}>
                    {roletype.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {teamPermission?.Team?.includes('team:remove-team-user') && (
            <button
              type="button"
              className="eliminate-btn"
              disabled={removingUserId}
              onClick={handleRemove}
            >
              <FontAwesomeIcon icon="plus" className="mr-2" />
              <span>{authUser?.id === id ? 'Leave' : 'Remove'}</span>

              {removingUserId === id && (
                <FontAwesomeIcon icon="spinner" className="spinner" />
              )}
            </button>
          )}

        </div>
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

TeamMember.propTypes = {
  teamId: PropTypes.number.isRequired,
  authUser: PropTypes.object.isRequired,
  removingUserId: PropTypes.number,
  selected: PropTypes.bool,
  user: PropTypes.object.isRequired,
  // permission: PropTypes.object.isRequired,
  selectMe: PropTypes.func.isRequired,
  deselectMe: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  teamPermission: PropTypes.object.isRequired,
};

TeamMember.defaultProps = {
  selected: false,
  removingUserId: null,
};

export default TeamMember;
