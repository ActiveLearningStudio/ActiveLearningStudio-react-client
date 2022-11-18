/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFiltersAction, setParamsAction, setFiltersAction } from 'store/actions/existingActivitySearch';
import './styles.scss';

const ExistingLibrarySearchQuery = (props) => {
  const {
    params,
    organization,
    filters,
    getFilters,
    setParams,
    setFilters,
  } = props;

  const [internalParams, setInternalParams] = useState({
    query: '',
    negativeQuery: '',
    author: '',
    library: false,
  });

  useEffect(() => {
    getFilters(organization.id);
  }, []);

  const queryChange = (e) => {
    if (e.target.name == 'query' || e.target.name == 'negativeQuery' || e.target.name == 'author') {
      return setInternalParams({
        ...internalParams,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === 'library') {
      return setInternalParams({
        ...internalParams,
        library: e.target.checked,
        author: e.target.checked ? internalParams.author : '',
      });
    }

    const [filterName, filterId] = e.target.value.split('-', 2);
    const newFilters = { 
      ...filters,
      [filterName]: filters[filterName].map((filter) => {
        if (filter.id !== parseInt(filterId)) return filter;

        return {
          ...filter,
          checked: e.target.checked,
        }
      })
    };

    const newParams = {
      ...params,
      from: 0,
    };
    newParams.subjectArray = newParams.subjectIds = newFilters.subjects.filter((filter) => filter.checked).map((filter) => filter.id);
    newParams.gradeArray = newParams.educationLevelIds = newFilters.levels.filter((filter) => filter.checked).map((filter) => filter.id);
    newParams.authorTagsIds = newFilters.tags.filter((filter) => filter.checked).map((filter) => filter.id);
    newParams.h5pLibraries = newFilters.types.filter((filter) => filter.checked).map((filter) => filter.lib);

    setFilters(newFilters);
    return setParams(newParams);
  };

  const handleSubmit = () => {
    setParams({
      ...params,
      ...internalParams,
      from: 0,
    });
  };

  return (
    <div className="existing-library-search-query">
      <div className="row">
        <div className="col">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  Search Library
                  <FontAwesomeIcon className="ml-2" icon="chevron-down" />
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className='form-group'>
                    <label>Contains</label>
                    <input type="text" className='form-control' name="query" value={internalParams.query} onChange={queryChange} />
                  </div>
                  <div className='form-group'>
                    <label>Does Not Contain</label>
                    <input type="text" className='form-control' name="negativeQuery" value={internalParams.negativeQuery} onChange={queryChange} />
                  </div>
                  <div className='form-group checkbox-group'>
                    <label>Include Items in Library</label>
                    <input type="checkbox" className='form-control' name="library" onChange={queryChange} checked={internalParams.library} />
                  </div>
                  <div className='form-group'>
                    <label>Author</label>
                    <input type="text" className='form-control' name="author" value={internalParams.author} onChange={queryChange} disabled={!internalParams.library} />
                  </div>
                  <div className='form-group text-right'>
                    <button type="submit" className='btn btn-primary' onClick={handleSubmit}>
                      <FontAwesomeIcon icon="search" className="mr-1" />
                      Search
                    </button>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="refine">
            Refine Your Search
          </div>          
        </div>
      </div>
      {Object.keys(filters).map((filterKey) => (
        <div key={filterKey} className="row mt-2">
          <div className="col">
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                    {(() => {
                      if (filterKey === 'levels') {
                        return 'Education Levels';
                      } else if (filterKey === 'tags') {
                        return 'Author Tags';
                      } else {
                        return filterKey;
                      }
                    })()}
                    <FontAwesomeIcon className="ml-2" icon="chevron-down" />
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {filters[filterKey].map((filter) => (
                      <div key={filter.id} className='form-group'>
                        <label>{filter.name}</label>
                        <input 
                          type="checkbox"
                          className='form-control'
                          name="filters[]"
                          value={`${filterKey}-${filter.id}`}
                          checked={filter.checked}
                          onChange={queryChange}
                        />
                      </div>
                    ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      ))}
    </div>
  );
};

ExistingLibrarySearchQuery.propTypes = {
    subjects: PropTypes.array,
    organization: PropTypes.object,
    params: PropTypes.object,
    getFilters: PropTypes.func,
    setParams: PropTypes.func,
    setFilters: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  getFilters: (org) => dispatch(getFiltersAction(org)),
  setParams: (params) => dispatch(setParamsAction(params)),
  setFilters: (filters) => dispatch(setFiltersAction(filters)),
});

const mapStateToProps = (state) => ({
  filters: state.existingActivitySearch.filters,
  organization: state.organization.currentOrganization,
  params: state.existingActivitySearch.searchParams,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingLibrarySearchQuery));
