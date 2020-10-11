import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

function MemberItem(props) {
  const {
    user,
    selectMe,
    deselectMe,
    selected,
  } = props;
  const {
    firstName,
    lastName,
    role,
    invited,
    projects,
  } = user;

  const inviteDialog = () => (
    <div className="invite-dialog" onBlur={deselectMe}>
      <h2 className="font-weight-bold">Invite Team Member</h2>

      <div>
        <h2>Enter Email</h2>

        <div className="row">
          <div className="col-md-12 email-input">
            <input
              type="text"
              placeholder="e.g. leo"
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 email-input">
            <button type="button" onClick={() => {}} className="dialog-invite">
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-md-12 member-item">
      <div className="member-name-mark">
        <span>{`${firstName[0]}${lastName[0]}`}</span>
      </div>

      <div className="member-info">
        <h2 className="member-name">{`${firstName} ${lastName}`}</h2>

        <div className="member-data">
          <h2>
            {`${role}  `}
            <span>●</span>
            {`  Assigned to ${projects.length} Projects`}
          </h2>
        </div>
      </div>

      <div className="button-container">
        <button
          type="button"
          className={classnames('invite-btn', {
            checked: invited,
          })}
          disabled={invited}
          onClick={selected ? deselectMe : selectMe}
        >
          {invited
            ? (
              <>
                <FontAwesomeIcon icon="check" className="mr-2" />
                <span>Invited</span>
              </>
            )
            : 'Invite'}
        </button>

        {selected && inviteDialog()}
      </div>
    </div>
  );
}

MemberItem.propTypes = {
  user: PropTypes.object.isRequired,
  selectMe: PropTypes.func.isRequired,
  deselectMe: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

MemberItem.defaultProps = {
  selected: false,
};

export default withRouter(MemberItem);
