import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import _ from 'lodash';
import {
  removeMemberAction,
  loadTeamAction,
  addMembersToProjectAction,
  getTeamPermission,
} from 'store/actions/team';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import TeamMember from './TeamMember';

import './style.scss';

function AddMembersPage(props) {
  const {
    removingUserId,
    user,
    computedMatch: { params: { teamId, projectId } },
    team: {
      selectedTeam: {
        id,
        users,
        projects,
      },
      isLoading,
    },
    removeMember,
    addMembers,
    loadTeam,
  } = props;

  const [search, setSearch] = useState('');
  const [chosenUsers, setChosenUsers] = useState([]);
  const organization = useSelector((state) => state.organization);
  const { teamPermission } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const triggerUsers = (userId) => {
    const index = chosenUsers.indexOf(userId);
    const chosen = chosenUsers;
    if (index > -1) {
      setChosenUsers([...chosen.slice(0, index), ...chosen.slice(index + 1, chosen.length)]);
    } else {
      setChosenUsers([...chosen, userId]);
    }
  };

  useEffect(() => {
    loadTeam(teamId);
  }, [loadTeam, teamId]);
  // Fetch team permission if page reloads
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, id));
    }
  }, [teamPermission]);
  const handleAssign = useCallback(() => {
    addMembers(id, projectId, chosenUsers)
      .then(() => {
        setSearch('');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add member.',
        });
      });
  }, [addMembers, chosenUsers, id, projectId]);

  const [selectedMember, setSelectedMember] = useState(null);

  if (!projects) return <></>;

  // TODO need to be clean up
  const thisUsers = projects.find((project) => project.id === parseInt(projectId, 10)).users;
  let filteredUsers = _.filter(users,
    (p) => (thisUsers || []).findIndex((u) => p.id === u.id) === -1);

  filteredUsers = filteredUsers
    ? filteredUsers.filter((u) => `${u.first_name} ${u.last_name}`.toLowerCase().indexOf(search.toLowerCase()) > -1)
    : [];

  const authUser = users ? users.find((u) => u.id === user.id) : [];

  const finishButton = () => (
    <button
      type="button"
      className="create-team-submit-btn"
      disabled={isLoading}
      onClick={handleAssign}
    >
      Add

      {isLoading && (
        <FontAwesomeIcon icon="spinner" />
      )}
    </button>
  );

  return (
    <>
      <div className="teams-page">
        {/* <div className="sidebar-wrapper">
          <Sidebar />
        </div> */}

        <div className="content-wrapper">
          <div className="content">
            <div className="member-add">
              <div className="title-box">
                <h2 className="title">Assign Members</h2>
                <div className="title-cross" />
              </div>

              <div className="team-information">
                <div className="member-management-wrapper">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Filter by name"
                          value={search}
                          onChange={handleChangeSearch}
                        />

                        {finishButton()}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="member-list">
                        {filteredUsers.map((u) => (
                          <div key={u.id}>
                            <TeamMember
                              teamId={id}
                              authUser={authUser}
                              removingUserId={removingUserId}
                              selected={selectedMember === u.id}
                              user={u}
                              hideRemove
                              selectMe={() => setSelectedMember(u.id)}
                              deselectMe={() => setSelectedMember(null)}
                              removeMember={removeMember}
                              chosen={chosenUsers.indexOf(u.id) > -1}
                              trigger={() => triggerUsers(u.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {finishButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AddMembersPage.propTypes = {
  removingUserId: PropTypes.number,
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  removeMember: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  addMembers: PropTypes.func.isRequired,
};

AddMembersPage.defaultProps = {
  removingUserId: null,
};

const mapStateToProps = (state) => ({
  removingUserId: state.team.removingUserId,
  user: state.auth.user,
  team: state.team,
});

const mapDispatchToProps = (dispatch) => ({
  removeMember: (teamId, userId) => dispatch(removeMemberAction(teamId, userId)),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  addMembers: (teamId, projectId, userIds) => dispatch(addMembersToProjectAction(teamId, projectId, userIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersPage);
