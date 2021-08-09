import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroupAction } from 'store/actions/group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GroupCard(props) {
  const {
    group: {
      id,
      name,
      description,
      users,
      projects,
    },
  } = props;
  const dispatch = useDispatch();
  // let memCnt = `00${users.length}`;
  // memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  // let projCnt = `00${projects.length}`;
  // projCnt = projCnt.slice(projCnt.length - 2, projCnt.length);
  const deleteGroup = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this group?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGroupAction(id));
      }
    });
  };
  return (
    <div className="group-card-content">
      <div className="group-title">
        <Link to={`/studio/org/${organization.currentOrganization?.domain}/groups/${id}`} className="title m-0">{name}</Link>
        {permission?.Group?.includes('group:edit') && (
          <Link className="edit-button" to={`/org/${organization.currentOrganization?.domain}/groups/${id}/edit`}>
            <FontAwesomeIcon icon="pen" className="mr-2" />
            Edit
          </Link>
        )}
        <h2 className="describe">{description}</h2>
      </div>

      <div className="group-member-content mid-border">
        <div className="sub-title">
          <span>Group Members</span>
          <span>{`(${users?.length})`}</span>
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
        <span>Projects for the Group</span>
        <span>{`(${projects?.length})`}</span>
      </div>
      {permission?.Group?.includes('group:delete') && (
        <div>
          <button type="button" onClick={() => deleteGroup()} className="back-button" style={{ textAlign: 'center' }}>
            Delete Group
          </button>
        </div>
      )}
    </div>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupCard;
