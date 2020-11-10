import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validator from 'validator';

function MemberItem(props) {
  const {
    invited,
    isInviting,
    selected,
    user,
    selectMember,
    inviteUser,
  } = props;

  const [email, setEmail] = useState('');

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleInvite = useCallback(() => {
    inviteUser({ ...user, email });
  }, [email, user, inviteUser]);

  const toggle = useCallback(() => {
    if (selected) {
      selectMember(null);
      setEmail('');
    } else {
      selectMember(user.id);
    }
  }, [user, selected, selectMember]);

  const handleBlur = useCallback((e) => {
    const { currentTarget } = e;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        selectMember(null);
        setEmail('');
      }
    }, 0);
  }, [selectMember]);

  return (
    <div className="member-item">
      <div className="member-name-mark">
        <span>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</span>
      </div>

      <div className="member-info">
        <h2 className="member-name">{`${user.name || user.email}`}</h2>

        <div className="member-data">
          <h2>
            {/* {`${user.role}  `} */}
            {/* <span>●</span> */}
            {`Assigned to ${user.projects ? user.projects.length : 0} Projects`}
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
          onClick={toggle}
        >
          {invited && (
            <FontAwesomeIcon icon="check" className="mr-2" />
          )}
          <span>{invited ? 'Invited' : 'Invite'}</span>
        </button>

        {selected && (
          <div className="invite-dialog" onBlur={handleBlur}>
            <h2 className="font-weight-bold">Invite Team Member</h2>
            <div>
              <h2>Enter Email</h2>

              <div className="email-input">
                <input
                  type="text"
                  placeholder="e.g. abby@curriki.org"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <button
                type="button"
                disabled={!email || !validator.isEmail(email) || isInviting}
                onClick={handleInvite}
              >
                Invite

                {isInviting && (
                  <FontAwesomeIcon icon="spinner" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

MemberItem.propTypes = {
  invited: PropTypes.bool.isRequired,
  isInviting: PropTypes.bool.isRequired,
  selected: PropTypes.bool,
  user: PropTypes.object.isRequired,
  selectMember: PropTypes.func,
  inviteUser: PropTypes.func,
};

MemberItem.defaultProps = {
  selected: false,
  selectMember: () => {},
  inviteUser: () => {},
};

export default MemberItem;
