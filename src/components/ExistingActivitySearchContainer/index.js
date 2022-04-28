/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './styles.scss';
import cross from 'assets/images/cross-icon.png';
import ExistingActivitySearch from 'components/ExistingActivitySearchContainer/ExistingActivitySearch';
import { existingActivitySearchGetAction, existingActivitySearchResetAction } from 'store/actions/search';

const ExistingActivitySearchContainer = (props) => {
  const {
    closeModal,
    insertActivityCallback,
    libraries,
    getActivityData,
    selectedActivity,
    resetActivityData,
  } = props;

  const handleAddActivity = (activity) => {
    getActivityData(activity.id);
  };

  useEffect(() => {
    if (selectedActivity === null) return;

    const data = {
      specific: {
        action: {
          params: JSON.parse(selectedActivity.h5p.params),
          library: `${selectedActivity.h5p.library.name} ${selectedActivity.h5p.library.majorVersion}.${selectedActivity.h5p.library.minorVersion}`,
          metadata: { ...selectedActivity.h5p.metadata},
          subContentId: '',
        }
      },
      generic: 'action',
    };
    insertActivityCallback(data);
    resetActivityData();
    closeModal();
  }, [selectedActivity])

  return (
    <Modal {...props} show backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="existing-activity-search-modal">
      <Modal.Header>
          <h2 className="curriki-utility-headings">Add existing activities</h2>
          <img
            src={cross}
            alt="cross"
            onClick={closeModal}
          />
      </Modal.Header>
      <Modal.Body>
          <ExistingActivitySearch addActivity={handleAddActivity} libraries={libraries} />
      </Modal.Body>
    </Modal>
  );
};

ExistingActivitySearchContainer.propTypes = {
};

ExistingActivitySearchContainer.defaultProps = {
};

const mapStateToProps = (state) => ({
  selectedActivity: state.search.existingActivitySearchSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getActivityData: (activityId) => dispatch(existingActivitySearchGetAction(activityId)),
  resetActivityData: () => dispatch(existingActivitySearchResetAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingActivitySearchContainer));