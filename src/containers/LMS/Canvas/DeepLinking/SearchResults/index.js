import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import {
  backToSearchAction,
  setPreviewActivityAction,
  closePreviewAction,
  previousPageAction,
  nextPageAction,
  searchAction,
} from 'store/actions/canvas';
import PreviewActivity from 'containers/LMS/Canvas/DeepLinking/PreviewActivity';
import './style.scss';

const SearchResults = (props) => {
  const {
    match,
    searchParams,
    hasMoreResults,
    activities,
    previewActivity,
    backToSearch,
    previousPage,
    nextPage,
    setPreviewActivity,
    closePreview,
    search,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    search(searchParams);
  }, [match, searchParams]);

  const launchPreview = (id) => {
    const activityId = parseInt(id, 10);
    const activity = activities.find((act) => act.id === activityId);
    if (activity) {
      closePreview();
      setPreviewActivity(activity);
    }
  };

  const addToLMS = (id) => {
    const activityId = parseInt(id, 10);
    const activity = activities.find((act) => act.id === activityId);
    if (!activity) return;

    const finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${
      encodeURIComponent(activity.title)}&entity=activity&id=${activity.id}`;
    Swal.fire({
      html: `You have selected <strong>Activity: ${activity.title}</strong><br>Do you want to continue ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        window.location.href = finalUrl;
      }
    });
  };

  return (
    <div className="results">
      <div className="row">
        <div className="col">
          <h2>Search Results</h2>
        </div>
        <div className="col text-right">
          <button type="button" className="btn back-action" onClick={backToSearch}>
            <FontAwesomeIcon icon="chevron-left" className="action-icon" />
            Back to Search
          </button>
        </div>
      </div>
      {activities !== null && activities.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">
              No results found.
            </Alert>
          </div>
        </div>
      )}
      {activities !== null && activities.length > 0 && activities.map((activity) => (
        <div className="row">
          <div className="col">
            <div key={activity.id} className="row result">
              <div className="col-2">
                <Image src={activity.thumb_url.includes('pexels.com') ? activity.thumb_url : `${global.config.resourceUrl}${activity.thumb_url}`} thumbnail />
              </div>
              <div className="col">
                <h3>
                  {activity.title.length > 0 && activity.title}
                  {activity.title.length === 0 && 'Activity title not available'}
                </h3>
                {activity.user && (
                  <p className="text-right">
                    <label>Author:</label>
                    {` ${activity.user.last_name}, ${activity.user.first_name} (${activity.user.email})`}
                  </p>
                )}
              </div>
              <div className="col-1 text-right actions">
                <Dropdown>
                  <Dropdown.Toggle className="actions-button">
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item to="#" eventKey={activity.id} onSelect={launchPreview}>
                      <FontAwesomeIcon icon="eye" className="action-icon" />
                      Preview
                    </Dropdown.Item>
                    <Dropdown.Item to="#" eventKey={activity.id} onSelect={addToLMS}>
                      <FontAwesomeIcon icon="plus" className="action-icon" />
                      Add to Course
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {(previewActivity && previewActivity.id === activity.id) && (
              <div className="row">
                <div className="col">
                  <PreviewActivity />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col text-left">
          {(!!searchParams.from && searchParams.from !== 0) && (
            <button type="button" className="pagination-buttons" onClick={previousPage}>Previous</button>
          )}
        </div>
        <div className="col text-right">
          {hasMoreResults && (
            <button type="button" className="pagination-buttons" onClick={nextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  hasMoreResults: PropTypes.bool.isRequired,
  activities: PropTypes.array.isRequired,
  previewActivity: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setPreviewActivity: PropTypes.func.isRequired,
  closePreview: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchParams: state.canvas.searchParams,
  hasMoreResults: state.canvas.hasMoreResults,
  activities: state.canvas.activities,
  previewActivity: state.canvas.previewActivity,
});

const mapDispatchToProps = (dispatch) => ({
  backToSearch: () => dispatch(backToSearchAction()),
  previousPage: () => dispatch(previousPageAction()),
  nextPage: () => dispatch(nextPageAction()),
  setPreviewActivity: (activity) => dispatch(setPreviewActivityAction(activity)),
  closePreview: () => dispatch(closePreviewAction()),
  search: (params) => dispatch(searchAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
