/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab, Pagination, Spinner } from 'react-bootstrap';
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
  } = props;

  const [key, setKey] = useState('independent-activities');
  const [independentActivitiesTabTitle, setIndependentActivitiesTabTitle] = useState('My Activities');
  const [projectActivitiesTabTitle, setProjectActivitiesTabTitle] = useState('My Project Activities');

  const paginate = (from, size, total) => {
    if (total <= size) return;

    const items = [];
    items.push(<Pagination.First key={0} onClick={() => handlePageChange('first')} />);
    items.push(<Pagination.Prev key={-1} onClick={() => handlePageChange('previous')} />);

    for (let i = 1; i <= Math.ceil(total / size) && i < 11; i++) {
      items.push(
        <Pagination.Item key={i} active={Math.ceil((from + 1) / size) === i} onClick={() => handlePageChange(i)} >
          {i}
        </Pagination.Item>
        );
    }

    items.push(<Pagination.Next key={-2} onClick={() => handlePageChange('next')} />);
    items.push(<Pagination.Last  key={-3} onClick={() => handlePageChange('last')} />);
    return items;
  };

  const handlePageChange = (i) => {
    var newFrom = 0;

    switch (i) {
      case 'first':
        newFrom = 0;
        break;
      
      case 'next':
        newFrom = params.from + params.size;
        let last = Math.floor(independentActivitiesTotal / params.size) * params.size;
        if (newFrom > last) newFrom = last;
        break;

      case 'previous':
        newFrom = params.from - params.size;
        if (newFrom < 0) newFrom = 0;
        break;

      case 'last':
        newFrom = Math.floor(independentActivitiesTotal / params.size) * params.size;
        break;

      default:
        newFrom = (i - 1) * params.size;
    }

    const newParams = {
      ...params,
      from: newFrom,
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
    if (filters.types.length === 0) return; // Activity type filters needed for compatibility

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
        <Tabs
          defaultActiveKey="independent-activities"
          className="main-tabs"
          onSelect={handleTabChange}
        >
          <Tab eventKey="independent-activities" title={independentActivitiesTabTitle}>
            {loading && (
              <Spinner animation="border" role="status" />
            )}
            {!loading && (
              <>
                <div className='row'>
                  <div className='col'>
                    {independentActivities.map((activity) => ( <ExistingActivityCard className="mb-2" key={activity.id} activity={activity} /> ))}
                  </div>
                </div>
                <div className='row'>
                  <div className='col pagination-div'>
                    {paginate(params.from, params.size, independentActivitiesTotal)}
                  </div>
                </div>
              </>
            )}

          </Tab>
          <Tab eventKey="projects" title={projectActivitiesTabTitle}>
            {loading && (
              <Spinner animation="border" role="status" />
            )}
            {!loading && (
              <>
                <div className='row'>
                  <div className='col'>
                    {projectActivities.map((activity) => ( <ExistingActivityCard className="mb-2" key={activity.id} activity={activity} /> ))}
                  </div>
                </div>
                <div className='row'>
                  <div className='col pagination-div'>
                    {paginate(params.from, params.size, projectActivitiesTotal)}
                  </div>
                </div>
              </>
            )}
          </Tab>
       </Tabs>
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
