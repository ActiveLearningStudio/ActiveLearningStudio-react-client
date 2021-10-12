import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { showResultsAction, updateParamsAction } from 'store/actions/canvas';
import {
  educationLevels as levels,
  subjects,
} from 'components/ResourceCard/AddResource/dropdownData';
import './style.scss';

const SearchForm = (props) => {
  const {
    match,
    showResults,
    params,
    updateParams,
  } = props;
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('user_email'); // LMS user email
  const [advanced, setAdvanced] = useState(false);
  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    updateParams({
      ...params,
      ltiClientId: match.params.ltiClientId,
      userEmail,
      mode: 'search',
    });
  }, [match]);

  const onSubmit = (e) => {
    e.preventDefault();
    showResults();
  };

  const fieldChanged = (e) => {
    updateParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="row mt-2">
        <div className="col">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search Phrase" name="query" onChange={fieldChanged} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <select className="form-control" name="private" onChange={fieldChanged} defaultValue="0">
              <option value="0">Public Activities</option>
              <option value="1">Private Activities</option>
            </select>
          </div>
        </div>
      </div>
      {advanced && (
        <div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control" name="subject" onChange={fieldChanged} defaultValue="">
                  <option value="" disabled>Subject Area</option>
                  {subjects.map((subject) => <option value={subject.value} key={subject.value}>{subject.subject}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <select className="form-control" name="level" onChange={fieldChanged} defaultValue="">
                  <option value="" disabled>Education Level</option>
                  {levels.map((level) => <option value={level.value} key={level.value}>{level.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input type="date" className="form-control" placeholder="From Date" name="start" onChange={fieldChanged} />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input type="date" className="form-control" placeholder="To Date" name="end" onChange={fieldChanged} />
              </div>
            </div>
          </div>
          { params.private !== '1' && (
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Author" name="author" onChange={fieldChanged} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Form.Check
        type="switch"
        id="advancedSwitch"
        label="Advanced Search"
        checked={advanced}
        onChange={() => setAdvanced(!advanced)}
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
  params: PropTypes.object.isRequired,
  showResults: PropTypes.func.isRequired,
  updateParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  params: state.canvas.searchParams,
});

const mapDispatchToProps = (dispatch) => ({
  showResults: () => dispatch(showResultsAction()),
  updateParams: (params) => dispatch(updateParamsAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
