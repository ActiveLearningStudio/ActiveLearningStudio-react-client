import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTeamAction, getTeamPermission, updateSelectedTeamAction } from 'store/actions/team';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import Delete from 'assets/images/menu-dele.svg';
import Edit from 'assets/images/menu-edit.svg';
import teamicon from 'assets/images/sidebar/users-team.svg';
import foldericon from 'assets/images/svg/projectFolder.svg';

function TeamCard(props) {
  const {
    team: {
      id,
      name,
      description,
      users,
      projects,
    },
  } = props;
  const dispatch = useDispatch();
  const deleteTeam = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this team?',
      // eslint-disable-next-line max-len
      html: '<strong>The projects associated with this team will no longer available in Team projects. If you want make a copy for that project then visit Team project page first to make a clone</strong>',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeamAction(id));
      }
    });
  };
  // let memCnt = `00${users.length}`;
  // memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  // let projCnt = `00${projects.length}`;
  // projCnt = projCnt.slice(projCnt.length - 2, projCnt.length);

  return (
    <div className="team-card-content">
      <div className="team-title">
        <Link
          onClick={() => {
            dispatch(updateSelectedTeamAction({
              id, name, description, users, projects,
            }));
            dispatch(getTeamPermission(organization.currentOrganization.id, id));
          }}
          to={`/org/${organization.currentOrganization?.domain}/teams/${id}`}
        // className="title m-0"
        >
          {name}
        </Link>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <FontAwesomeIcon icon="ellipsis-v" className="icon" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {permission?.Team?.includes('team:edit') && (
              <Dropdown.Item
                as={Link}
                to={`/org/${organization.currentOrganization?.domain}/teams/${id}/edit`}
                onClick={() => {
                  dispatch(getTeamPermission(organization.currentOrganization.id, id));
                }}
              >
                <img src={Edit} alt="Edit" />
                Edit
              </Dropdown.Item>
            )}
            {permission?.Team?.includes('team:delete') && (
              <Dropdown.Item
                onClick={() => deleteTeam()}
              >
                <img src={Delete} alt="Preview" />
                Delete
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        {/* {permission?.Team?.includes('team:edit') && (
          <Link
            onClick={() => {
              dispatch(getTeamPermission(organization.currentOrganization.id, id));
            }}
            className="edit-button"
            to={`/org/${organization.currentOrganization?.domain}/teams/${id}/edit`}
          >
            <FontAwesomeIcon icon="pen" className="mr-2" />
            Edit
          </Link>
        )} */}
      </div>
      <div className="describe">{description.length > 50 ? `${description?.slice(0, 50)}...` : description}</div>
      <div className="team-member-content mid-border">
        <div className="sub-title">
          <img src={teamicon} alt="Team" />
          <span>
            {`${users?.length}`}
            {' '}
            Team Members
          </span>
          {/* <span>{`(${users?.length})`}</span> */}
        </div>

        <div className="member-mark-container">
          {users.map((user, index) => (
            <div key={user.id} className={`member-name-mark${index > 0 ? ' over' : ''}`}>
              <span>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sub-title">
        <img src={foldericon} alt="Project" />
        <span>
          {`${projects?.length}`}
          {' '}
          Projects
        </span>
        {/* <span>{`(${projects?.length})`}</span> */}
      </div>
      {/* {permission?.Team?.includes('team:delete') && (
        <div>
          <button type="button" onClick={() => deleteTeam()} className="back-button" style={{ textAlign: 'center' }}>
            Delete Team
          </button>
        </div>
      )} */}
    </div>
  );
}

TeamCard.propTypes = {
  team: PropTypes.object.isRequired,
};

export default TeamCard;
