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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit
              </Dropdown.Item>
            )}
            {permission?.Team?.includes('team:delete') && (
              <Dropdown.Item onClick={() => deleteTeam()}>
                {/* <img src={Delete} alt="Preview" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
          {/* <img src={teamicon} alt="Team" /> */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.25315 15.0622C10.8934 15.0622 13.0336 12.9219 13.0336 10.2817C13.0336 7.64152 10.8934 5.50122 8.25315 5.50122C5.61296 5.50122 3.47266 7.64152 3.47266 10.2817C3.47266 12.9219 5.61296 15.0622 8.25315 15.0622Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M14.4512 5.67916C15.1086 5.49391 15.7982 5.45171 16.4734 5.5554C17.1487 5.65909 17.7939 5.90627 18.3654 6.28029C18.9371 6.65431 19.4219 7.14649 19.7874 7.72367C20.1527 8.30085 20.3902 8.94963 20.4838 9.62631C20.5773 10.303 20.5247 10.9919 20.3296 11.6465C20.1345 12.3012 19.8014 12.9065 19.3527 13.4215C18.9039 13.9366 18.35 14.3495 17.7283 14.6326C17.1065 14.9155 16.4314 15.062 15.7483 15.0621"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.63379 18.5C2.38041 17.438 3.37158 16.5712 4.52365 15.9728C5.67571 15.3745 6.95484 15.062 8.25302 15.062C9.55121 15.062 10.8304 15.3743 11.9825 15.9726C13.1346 16.5708 14.1258 17.4375 14.8725 18.4995"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.748 15.062C17.0463 15.0611 18.3257 15.373 19.478 15.9713C20.6302 16.5697 21.6213 17.4369 22.3672 18.4995"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

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
        {/* <img src={foldericon} alt="Project" /> */}
        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <path
              d="M4 9.60938V24.6094C4 25.2998 4.55965 25.8594 5.25 25.8594H25.25C25.9404 25.8594 26.5 25.2998 26.5 24.6094V11.3402C26.5 10.6498 25.9404 10.0902 25.25 10.0902H16.4038"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16.4038 10.0902L12.933 6.04244C12.8159 5.92523 12.6569 5.85938 12.4911 5.85938H4.625C4.27983 5.85938 4 6.1392 4 6.48437V9.60937"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="30" height="30" fill="white" transform="translate(0 0.859375)" />
            </clipPath>
          </defs>
        </svg>

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
