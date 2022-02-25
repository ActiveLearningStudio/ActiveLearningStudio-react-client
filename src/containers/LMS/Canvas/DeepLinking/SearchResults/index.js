/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Swal from 'sweetalert2';
import {
  backToSearchAction,
  // setPreviewActivityAction,
  // closePreviewAction,
  previousPageAction,
  nextPageAction,
  searchAction,
} from 'store/actions/canvas';
// import PreviewActivity from 'containers/LMS/Canvas/DeepLinking/PreviewActivity';
import Project from 'containers/LMS/Canvas/DeepLinking/Project';
import './style.scss';

const SearchResults = (props) => {
  const { match, searchParams, hasMoreResults, projects, backToSearch, previousPage, nextPage, search } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    search(searchParams);
  }, [match, searchParams]);

  return (
    <div className="results">
      <div className="row my-4">
        <div className="col">
          <h4 className="search-heading">Search Results</h4>
        </div>
        <div className="col text-right">
          <button type="button" className="btn back-action" style={{ color: 'rgb(8, 72, 146) ' }} onClick={backToSearch}>
            <FontAwesomeIcon icon="chevron-left" className="action-icon mr-2" />
            Back to Search
          </button>
        </div>
      </div>
      {projects !== null && projects.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">No results found.</Alert>
          </div>
        </div>
      )}
      <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
        <Tab eventKey="project" title="Project">
          {projects !== null && projects.length > 0 && projects.map((project) => <Project project={project} key={project.id} />)}
          <div className="row">
            <div className="col text-left">
              {!!searchParams.from && searchParams.from !== 0 && (
                <button type="button" className="btn btn-primary pagination-buttons" onClick={previousPage}>
                  Previous
                </button>
              )}
            </div>
            <div className="col text-right">
              {hasMoreResults && (
                <button type="button" className="btn btn-primary pagination-buttons" onClick={nextPage}>
                  Next
                </button>
              )}
            </div>
          </div>
        </Tab>
        <Tab eventKey="Playlists" title="Playlists"></Tab>
      </Tabs>
    </div>
  );
};

SearchResults.defaultProps = {
  projects: null,
};

SearchResults.propTypes = {
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  hasMoreResults: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  backToSearch: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchParams: state.canvas.searchParams,
  hasMoreResults: state.canvas.searchHasMoreResults,
  projects: state.canvas.searchProjects,
});

const mapDispatchToProps = (dispatch) => ({
  backToSearch: () => dispatch(backToSearchAction()),
  previousPage: () => dispatch(previousPageAction()),
  nextPage: () => dispatch(nextPageAction()),
  search: (params) => dispatch(searchAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
