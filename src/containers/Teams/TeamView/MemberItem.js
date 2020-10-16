import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ADMIN = 'Admin';

function MemberItem(props) {
  const {
    user: {
      firstName,
      lastName,
      role,
      projects,
    },
    selectMe,
    deselectMe,
    selected,
  } = props;

  const projectDialog = (ownProjects) => {
    if (ownProjects.length === 0) {
      return (
        <div className="invite-dialog empty" onBlur={deselectMe}>
          <div onClick={deselectMe}>
            <FontAwesomeIcon icon="plus" className="mr-2" />
          </div>
          <h2>EMPTY</h2>
        </div>
      );
    }

    return (
      <div className="invite-dialog" onBlur={deselectMe}>
        <div onClick={deselectMe}>
          <FontAwesomeIcon icon="plus" className="mr-2" />
        </div>
        {ownProjects.map((project, index) => (
          <h2 key={project.title} className={`${index > 0 ? 'border-top' : ''}`}>
            {project}
          </h2>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="col-md-12 member-item" onClick={selected ? deselectMe : selectMe}>
        <div className="member-name-mark">
          <span>{`${firstName[0]}${lastName[0]}`}</span>
        </div>

        <div className="member-info">
          <h2 className="member-name">{`${firstName} ${lastName}`}</h2>

          <div className="member-data">
            <h2>
              {role === ADMIN && (
                <>
                  <span>{role}</span>
                  <span style={{ margin: '0 9px' }}>●</span>
                </>
              )}
              {`Assigned to ${projects.length} Projects`}
            </h2>

            <div className="collapse-btn">
              <button type="button">
                <FontAwesomeIcon icon={selected ? 'caret-up' : 'caret-down'} className="mr-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button type="button" className="eliminate-btn">
            <FontAwesomeIcon icon="plus" className="mr-2" />
            <span>{role === ADMIN ? 'Leave' : 'Remove'}</span>
          </button>
        </div>
      </div>

      {selected && projectDialog(projects)}
    </>
  );
}

MemberItem.propTypes = {
  selected: PropTypes.bool,
  user: PropTypes.object.isRequired,
  selectMe: PropTypes.func.isRequired,
  deselectMe: PropTypes.func.isRequired,
};

MemberItem.defaultProps = {
  selected: false,
};

export default MemberItem;
