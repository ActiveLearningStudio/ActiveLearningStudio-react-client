import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, /* Dropdown, */ Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Swal from 'sweetalert2';
import {
  backToSearchAction,
  // setPreviewActivityAction,
  // closePreviewAction,
  previousPageAction,
  nextPageAction,
  searchAction,
  showSearchProjectAction,
} from 'store/actions/canvas';
// import PreviewActivity from 'containers/LMS/Canvas/DeepLinking/PreviewActivity';
import './style.scss';

const SearchResults = (props) => {
  const {
    match,
    searchParams,
    hasMoreResults,
    projects,
    selectedProject,
    // activities,
    // previewActivity,

    backToSearch,
    previousPage,
    nextPage,
    showProject,
    search,
    // setPreviewActivity,
    // closePreview,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    search(searchParams);
  }, [match, searchParams]);

/*
  const launchPreview = (id) => {
    const activityId = parseInt(id, 10);
    const activity = activities.find((act) => act.id === activityId);
    if (activity) {
      closePreview();
      setPreviewActivity(activity);
    }
  };
*/

/*
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
*/
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
      {projects !== null && projects.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">
              No results found.
            </Alert>
          </div>
        </div>
      )}
      {projects !== null && projects.length > 0 && projects.map((project) => (
        <div className="row" key={project.id}>
          <div className="col">
            <div key={project.id} className="row result">
              <div className="col-2">
                <Image src={project.thumb_url.includes('pexels.com') ? project.thumb_url : `${global.config.resourceUrl}${project.thumb_url}`} thumbnail />
              </div>
              <div className="col">
                <h3>
                  {project.title.length > 0 && project.title}
                  {project.title.length === 0 && 'Project title not available'}
                </h3>
                <p>
                  {project.description.length > 0 && project.description}
                  {project.description.length === 0 && 'Project description not available'}
                </p>
                {project.user && (
                  <p className="text-right">
                    <label>Author:</label>
                    {` ${project.user.last_name}, ${project.user.first_name} (${project.user.email})`}
                  </p>
                )}
              </div>
              <div className="col-1 text-right actions">
                <button className="btn btn-primary" type="button" onClick={() => showProject(project)}>View Playlists</button>
              </div>
            </div>

            {(selectedProject && selectedProject.id === project.id) && (
              <div className="row">
                <div className="col">
                  {selectedProject.playlists.length === 0 && (
                    <Alert variant="warning">
                      This project has no playlists
                    </Alert>
                  )}
                  {selectedProject.playlists.length > 0 && selectedProject.playlists.map((playlist) => (
                    <p key={playlist.id}>{playlist.title}</p>
                  ))}
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

SearchResults.defaultProps = {
  projects: null,
  selectedProject: null,
};

SearchResults.propTypes = {
  match: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  hasMoreResults: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  selectedProject: PropTypes.object,
  // activities: PropTypes.array.isRequired,
  // previewActivity: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  // setPreviewActivity: PropTypes.func.isRequired,
  // closePreview: PropTypes.func.isRequired,
  showProject: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  searchParams: state.canvas.searchParams,
  hasMoreResults: state.canvas.searchHasMoreResults,
  projects: state.canvas.searchProjects,
  selectedProject: state.canvas.searchSelectedProject,
});

const mapDispatchToProps = (dispatch) => ({
  backToSearch: () => dispatch(backToSearchAction()),
  previousPage: () => dispatch(previousPageAction()),
  nextPage: () => dispatch(nextPageAction()),
  // setPreviewActivity: (activity) => dispatch(setPreviewActivityAction(activity)),
  // closePreview: () => dispatch(closePreviewAction()),
  showProject: (project) => dispatch(showSearchProjectAction(project)),
  search: (params) => dispatch(searchAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
