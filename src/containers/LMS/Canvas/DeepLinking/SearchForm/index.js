import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { searchAction } from 'store/actions/canvas';
import {
  educationLevels as levels,
  subjects,
} from 'components/ResourceCard/AddResource/dropdownData';
import logo from 'assets/images/logo.png';
import './style.scss';

const SearchForm = (props) => {
  const {
    match,
    search,
  } = props;

  const [advanced, setAdvanced] = useState(false);
  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match]);

  const onSubmit = (e) => {
    e.preventDefault();
    search({});
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="row">
        <div className="col">
          <h2>Search Resources</h2>
        </div>
        <div className="col text-right">
          <img src={logo} alt="Curriki Studio Logo" />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search Phrase" />
          </div>
        </div>
      </div>
      {advanced && (
        <div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control">
                  <option value="" disabled selected>Resource Type</option>
                  <option value="project">Project</option>
                  <option value="playlist">Playlist</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control">
                  <option value="" disabled selected>Subject Area</option>
                  {subjects.map((subject) => <option value={subject.value}>{subject.subject}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control">
                  <option value="" disabled selected>Education Level</option>
                  {levels.map((level) => <option value={level.value}>{level.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input type="date" className="form-control" placeholder="From Date" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input type="date" className="form-control" placeholder="To Date" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Author" />
              </div>
            </div>
          </div>
        </div>
      )}
      <Form.Check
        type="switch"
        id="advancedSwitch"
        label="Advanced Search"
        checked={advanced}
        onClick={() => setAdvanced(!advanced)}
      />
      <div className="row">
        <div className="col text-right">
          <div className="form-group">
            <button className="btn btn-primary search-submit-button" type="submit">Search</button>
          </div>
        </div>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  match: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  params: state.canvas.params,
});

const mapDispatchToProps = (dispatch) => ({
  search: (params) => dispatch(searchAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
