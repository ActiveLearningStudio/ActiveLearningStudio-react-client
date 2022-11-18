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
    layout,
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

    let data = null;

    if (selectedActivity.activityType === 'independent') {
      const contentKey = Object.getOwnPropertyNames(selectedActivity.h5p.settings.contents)[0];
      data = {
        specific: {
          action: {
            params: JSON.parse(selectedActivity.activity.h5p_content.parameters),
            library: selectedActivity.h5p.settings.contents[contentKey].library,
            metadata: { ...selectedActivity.h5p.settings.contents[contentKey].metadata},
            subContentId: '',
          }
        },
        generic: 'action',
      };
    } else {
      data = {
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
    }
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
        <ExistingLibrarySearch addActivity={handleAddActivity} libraries={libraries} layout={layout} />
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col footer-info">
            <FontAwesomeIcon className="mr-2" icon="info-circle" />
            {layout && (`You're searching for existing activities compatible with ${layout.title}`)}
            {!layout && (`You're searching for existing activities compatible with the parent layout.`)}
          </div>
        </div>
      </Modal.Footer>
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