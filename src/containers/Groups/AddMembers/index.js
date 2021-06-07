import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import _ from 'lodash';
import {
  removeMemberAction,
  loadGroupAction,
  addMembersToProjectAction,
} from 'store/actions/group';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import GroupMember from './GroupMember';

import './style.scss';

function AddMembersPage(props) {
  const {
    removingUserId,
    user,
    computedMatch: { params: { groupId, projectId } },
    group: {
      selectedGroup: {
        id,
        users,
        projects,
      },
      isLoading,
    },
    removeMember,
    addMembers,
    loadGroup,
  } = props;

  const [search, setSearch] = useState('');
  const [chosenUsers, setChosenUsers] = useState([]);

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
    loadGroup(groupId);
  }, [loadGroup, groupId]);

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
      className="create-group-submit-btn"
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
      <div className="groups-page">
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

              <div className="group-information">
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
                            <GroupMember
                              groupId={id}
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
  group: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  removeMember: PropTypes.func.isRequired,
  loadGroup: PropTypes.func.isRequired,
  addMembers: PropTypes.func.isRequired,
};

AddMembersPage.defaultProps = {
  removingUserId: null,
};

const mapStateToProps = (state) => ({
  removingUserId: state.group.removingUserId,
  user: state.auth.user,
  group: state.group,
});

const mapDispatchToProps = (dispatch) => ({
  removeMember: (groupId, userId) => dispatch(removeMemberAction(groupId, userId)),
  loadGroup: (groupId) => dispatch(loadGroupAction(groupId)),
  addMembers: (groupId, projectId, userIds) => dispatch(addMembersToProjectAction(groupId, projectId, userIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersPage);
