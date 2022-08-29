/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTeamAction, getTeamPermission, updateSelectedTeamAction } from 'store/actions/team';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import EditDpDnMdSvg from 'iconLibrary/dropDown/EditDpDnMdSvg';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';
import TeamMemberSmSvg from 'iconLibrary/mainContainer/TeamMemberSmSvg';
import MyProjectXsSvg from 'iconLibrary/mainContainer/MyProjectXsSvg';

function TeamCard(props) {
  const {
    team: {
      id,
      name,
      description,
      users,
      projects,
      // eslint-disable-next-line camelcase
      noovo_group_title,
    },
  } = props;
  const dispatch = useDispatch();
  const deleteTeam = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this team?',
      // eslint-disable-next-line max-len
      html:
        '<strong>The projects associated with this team will no be longer available in Team projects. If you want to make a copy for that project then visit Team project page first to make a clone</strong>',
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

  const organization = useSelector((state) => state.organization);
  const { permission } = organization;

  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <div className="team-card-content">
      <div className="team-title">
        <Link
          onClick={() => {
            dispatch(
              updateSelectedTeamAction({
                id,
                name,
                description,
                users,
                projects,
                noovo_group_title,
                // eslint-disable-next-line comma-dangle
              }),
            );
            dispatch(getTeamPermission(organization.currentOrganization.id, id));
          }}
          to={`/org/${organization.currentOrganization?.domain}/teams/${id}`}
          // className="title m-0"
        >
          {name}
        </Link>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <FontAwesomeIcon icon="ellipsis-v" className="icon" style={{ color: primaryColor }} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {permission?.Team?.includes('team:edit') && (
              <Dropdown.Item
                as={Link}
                to={`/org/${organization.currentOrganization?.domain}/teams/${id}`}
                onClick={() => {
                  dispatch(getTeamPermission(organization.currentOrganization.id, id));
                  dispatch(
                    updateSelectedTeamAction({
                      id,
                      name,
                      description,
                      users,
                      projects,
                      noovo_group_title,
                      // eslint-disable-next-line comma-dangle
                    }),
                  );
                }}
              >
                {/* <img src={Edit} alt="Edit" /> */}
                <EditDpDnMdSvg primaryColor={primaryColor} />
                Edit
              </Dropdown.Item>
            )}
            {permission?.Team?.includes('team:delete') && (
              <Dropdown.Item onClick={() => deleteTeam()}>
                <DeleteSmSvg primaryColor={primaryColor} />
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
          <TeamMemberSmSvg primaryColor={primaryColor} />
          <span>{`${users?.length}`} Team Members</span>
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
        <MyProjectXsSvg primaryColor={primaryColor} />
        <span>{`${projects?.length}`} Projects</span>
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
