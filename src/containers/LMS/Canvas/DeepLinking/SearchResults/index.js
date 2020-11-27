import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { backToSearchAction } from 'store/actions/canvas';
import './style.scss';

const SearchResults = (props) => {
  const {
    match,
    backToSearch,
    projects,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match]);

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
      <div className="row">
        <div className="col">
          Tabs here
        </div>
      </div>
      {projects.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">
              No results found.
            </Alert>
          </div>
        </div>
      )}
      {projects.length > 0 && projects.map((project) => (
        <div key={project.id} className="row result">
          <div className="col-2">
            <Image src={project.thumb_url} thumbnail />
          </div>
          <div className="col">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
          <div className="col-1 text-right actions">
            <Dropdown>
              <Dropdown.Toggle className="actions-button">
                <FontAwesomeIcon icon="ellipsis-v" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item to="#">
                  <FontAwesomeIcon icon="eye" className="action-icon" />
                  Preview
                </Dropdown.Item>
                <Dropdown.Item to="#">
                  <FontAwesomeIcon icon="plus" className="action-icon" />
                  Add to Course
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  match: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  params: state.canvas.params,
  projects: state.canvas.projects,
});

const mapDispatchToProps = (dispatch) => ({
  backToSearch: () => dispatch(backToSearchAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
