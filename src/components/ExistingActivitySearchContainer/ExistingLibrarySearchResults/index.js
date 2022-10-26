/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router-dom';
import { getActivitiesAction, setParamsAction } from 'store/actions/existingActivitySearch';
import ExistingActivityCard from '../ExistingActivityCard';
import './style.scss';

const ExistingActivitySearchResults = (props) => {
  const {
    params,
    filters,
    loading,
    independentActivities,
    independentActivitiesTotal,
    projectActivities,
    projectActivitiesTotal,
    getActivities,
    setParams,
    layout,
  } = props;

  const [key, setKey] = useState('independent-activities');
  const [independentActivitiesTabTitle, setIndependentActivitiesTabTitle] = useState('My Activities');
  const [projectActivitiesTabTitle, setProjectActivitiesTabTitle] = useState('My Project Activities');
  const [filterError, setFilterError] = useState(false);

  const handlePageChange = (i) => {
    const newParams = {
      ...params,
      from: (i - 1) * params.size,
    };
    setParams(newParams);
  };

  const handleTabChange = (key) => {
    setKey(key);
    setParams({
      ...params,
      from: 0,
    });
  };

  useEffect(() => {
    if (filters.types.length === 0) { 
      // Activity type filters needed for compatibility
      setFilterError(true);
      return;
    }
    setFilterError(false);

    getActivities(params, key);
  }, [params, filters]);

  useEffect(() => {
    var indieTitle = (params.library) ? 'Activities' : 'My Activities';
    var projectTitle = (params.library) ? 'Project Activities' : 'My Project Activities';

    if (key === 'independent-activities') {
      indieTitle += ` (${independentActivitiesTotal})`;
    } else {
      projectTitle += ` (${projectActivitiesTotal})`;
    }

    setIndependentActivitiesTabTitle(indieTitle);
    setProjectActivitiesTabTitle(projectTitle);
  }, [key, params, independentActivitiesTotal, projectActivitiesTotal]);

  return (
    <div className='row existing-activity-search-results'>
      <div className='col'>
        {filterError && (
          <Alert className="alert" variant="danger">
            Activity import is not supported for this activity type: {layout.title}
          </Alert>
        )}
        {!filterError && (
          <Tabs
            defaultActiveKey="independent-activities"
            className="main-tabs"
            onSelect={handleTabChange}
          >
            <Tab eventKey="independent-activities" title={independentActivitiesTabTitle}>
              {loading && (
                <Spinner animation="border" role="status" />
              )}
              {!loading && independentActivities.length < 1 && (
                <Alert className="alert" variant="info">
                  No activities found matching the search criteria.
                </Alert>
              )}
              {!loading && independentActivities.length > 0 && (
                <>
                  <div className='row'>
                    <div className='col'>
                      {independentActivities.map((activity) => ( <ExistingActivityCard className="mb-2" key={activity.id} activity={activity} activityType="independent" /> ))}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col pagination-div'>
                      <Pagination
                        activePage={Math.ceil((params.from + 1) / params.size)}
                        itemsCountPerPage={params.size}
                        totalItemsCount={independentActivitiesTotal}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  </div>
                </>
              )}
            </Tab>
            <Tab eventKey="projects" title={projectActivitiesTabTitle}>
              {loading && (
                <Spinner animation="border" role="status" />
              )}
              {!loading && projectActivities.length < 1 && (
                <Alert className="alert" variant="info">
                  No activities found matching the search criteria.
                </Alert>
              )}
              {!loading && projectActivities.length > 0 && (
                <>
                  <div className='row'>
                    <div className='col'>
                      {projectActivities.map((activity) => ( <ExistingActivityCard className="mb-2" key={activity.id} activity={activity} activityType="project" /> ))}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col pagination-div'>
                      <Pagination
                        activePage={Math.ceil((params.from + 1) / params.size)}
                        itemsCountPerPage={params.size}
                        totalItemsCount={projectActivitiesTotal}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  </div>
                </>
              )}
            </Tab>
          </Tabs>
        )}
      </div>      
    </div>
  );
};

ExistingActivitySearchResults.propTypes = {
  params: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  getActivities: (params, type) => dispatch(getActivitiesAction(params, type)),
  setParams: (params) => dispatch(setParamsAction(params)),
});

const mapStateToProps = (state) => ({
  independentActivities: state.existingActivitySearch.independentActivities,
  independentActivitiesTotal: state.existingActivitySearch.independentActivitiesTotal,
  projectActivities: state.existingActivitySearch.projectActivities,
  projectActivitiesTotal: state.existingActivitySearch.projectActivitiesTotal,
  params: state.existingActivitySearch.searchParams,
  filters: state.existingActivitySearch.filters,
  loading: state.existingActivitySearch.loading,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingActivitySearchResults));
