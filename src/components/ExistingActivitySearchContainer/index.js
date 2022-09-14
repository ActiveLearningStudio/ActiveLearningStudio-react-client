/*eslint-disable*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './styles.scss';
import ExistingLibrarySearch from 'components/ExistingActivitySearchContainer/ExistingLibrarySearch';
import { existingActivitySearchGetAction, existingActivitySearchResetAction } from 'store/actions/search';
import { clearSearchAction } from 'store/actions/existingActivitySearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExistingActivitySearchContainer = (props) => {
  const {
    closeModal,
    insertActivityCallback,
    libraries,
    getActivityData,
    selectedActivity,
    resetActivityData,
    clearSearch,
  } = props;

  const handleAddActivity = (activity) => {
    getActivityData(activity.id);
  };

  const handleCloseModal = () => {
    clearSearch();
    closeModal();
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
    clearSearch();
    closeModal();
  }, [selectedActivity])

  return (
    <Modal show backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="existing-activity-search-modal">
      <Modal.Header>
        <div className="title">
          <p>CurrikiStudio</p>
          <h2 className="curriki-utility-headings">
            <FontAwesomeIcon className="mr-2" icon="search" />
            Explore Library Content
          </h2>
        </div>
        <div className="close">
          <FontAwesomeIcon className="ml-2" icon="times" onClick={handleCloseModal} />
        </div>
      </Modal.Header>
      <Modal.Body>
          <ExistingLibrarySearch addActivity={handleAddActivity} libraries={libraries} />
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
  clearSearch: () => dispatch(clearSearchAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingActivitySearchContainer));