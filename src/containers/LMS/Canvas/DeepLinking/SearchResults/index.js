/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Tabs, Tab, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchForm from 'containers/LMS/Canvas/DeepLinking/SearchForm';
import { showSearchProjectActionPlaylist, setPreviewActivityAction } from 'store/actions/canvas';
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
  const [dataActivity, setDataActivity] = useState(null);
  const dispatch = useDispatch();
  // const Playlist = async () => {
  //   var storeData = [];
  //   for (var i = 0; i < projects?.length; i++) {
  //     const result = await dispatch(showSearchProjectActionPlaylist(projects[i]));
  //     storeData.push(result.project.playlists?.map((data) => data?.activities));
  //   }
  //   setDataActivity(storeData);
  // };

  // Init
  useEffect(() => {
    search(searchParams);
  }, [match, searchParams]);

  return (
    <div className="results">
      {/*<div className="row my-4">
        <div className="col">
          <h4 className="search-heading">Search Results</h4>
        </div>
        <div className="col text-right">
          <button type="button" className="btn back-action" style={{ color: 'rgb(8, 72, 146) ' }} onClick={backToSearch}>
            <FontAwesomeIcon icon="chevron-left" className="action-icon mr-2" />
            Back to Search
          </button>
        </div>
  </div>*/}
      <SearchForm />
      {projects !== null && projects.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">No results found.</Alert>
          </div>
        </div>
      )}
      <Tabs defaultActiveKey="project" id="uncontrolled-tab-example">
        <Tab eventKey="project" title="Project">
          {projects ? (
            <>
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
            </>
          ) : (
            <Alert variant="warning">loading ...</Alert>
          )}
        </Tab>
        {/* <Tab eventKey="activities" title="Activities">
          {dataActivity ? (
            dataActivity?.length ? (
              dataActivity.map((data) =>
                data.map((data1) =>
                  data1.map((data2) => (
                    <div className="Playlists-container">
                      <div className="main-flex">
                        <div className="img-cont">
                          <div className="Playlists-img">
                            <img src={data2.thumb_url} />
                          </div>
                          <h6 className="Playlists-title">{data2.title}</h6>
                        </div>
                        <div className="ext-right">
                          <Dropdown>
                            <Dropdown.Toggle className="actions-button">
                              <FontAwesomeIcon icon="ellipsis-v" style={{ color: 'rgb(8, 72, 146)' }} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item to="#" eventKey={data2.id} onSelect={() => dispatch(setPreviewActivityAction(data2))}>
                                <FontAwesomeIcon icon="eye" className="action-icon" />
                                Preview
                              </Dropdown.Item>
                              <Dropdown.Item
                                to="#"
                                eventKey={data2.id}
                                onSelect={() => {
                                  const finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${encodeURIComponent(data2.title)}&entity=activity&id=${data2.id}`;
                                  Swal.fire({
                                    icon: 'warning',
                                    html: `You have selected <strong>Activity: ${data.title}</strong><br>Do you want to continue ?`,
                                    showCancelButton: true,
                                    confirmButtonColor: '#084892',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, add it',
                                  }).then((result) => {
                                    if (result.value) {
                                      window.location.href = finalUrl;
                                    }
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon="plus" className="action-icon" />
                                Add to Course
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )
            ) : (
              <Alert variant="warning">No results found.</Alert>
            )
          ) : (
            <Alert variant="warning">loading ...</Alert>
          )}
        </Tab> */}
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
