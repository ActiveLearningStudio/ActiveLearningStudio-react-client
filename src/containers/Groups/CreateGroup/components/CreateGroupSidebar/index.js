import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

function CreateGroupSidebar(props) {
  const {
    group: {
      showCreation,
      showInviting,
      showAssigning,
    },
    editMode,
  } = props;

  return (
    <div className="create-group-sidebar">
      <div
        className={classnames('group-sidebar-btn', {
          filled: showCreation || showInviting || showAssigning,
          selected: showCreation,
        })}
      >
        <div className="btn-box">
          <div className="number-box">
            <span className="number">1</span>
          </div>

          <span className="bottom-vertical-line" />
        </div>

        <span className="name">
          {editMode ? 'Edit ' : 'Create '}
          Group
        </span>
      </div>

      <div
        className={classnames('group-sidebar-btn last', {
          filled: showInviting || showAssigning,
          selected: showCreation || showInviting,
        })}
      >
        <div className="btn-box">
          <span className="top-vertical-line" />

          <div className="number-box">
            <span className="number">2</span>
          </div>

          <span className="bottom-vertical-line" />
        </div>

        <span className="name">Invite Members</span>
      </div>

      <div
        className={classnames('group-sidebar-btn last', {
          filled: showAssigning,
          selected: true,
        })}
      >
        <div className="btn-box">
          <span className="top-vertical-line" />

          <div className="number-box">
            <span className="number">3</span>
          </div>
        </div>

        <span className="name">Add/Assign Project</span>
      </div>
    </div>
  );
}

CreateGroupSidebar.propTypes = {
  group: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default CreateGroupSidebar;
