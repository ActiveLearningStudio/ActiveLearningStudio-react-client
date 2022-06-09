/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import SearchImg from '../../../../../assets/images/Search.svg';
import Arrow from '../../../../../assets/images/arrow-right.svg';
import { showResultsAction, updateParamsAction } from 'store/actions/canvas';
import { getOrgsForDeepLinkingAction } from 'store/actions/organization';
import { educationLevels, subjects } from 'components/ResourceCard/AddResource/dropdownData';
import './style.scss';

const SearchForm = (props) => {
  const { match, showResults, params, orgs, updateParams, getOrgs } = props;
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('user_email'); // LMS user email
  const [advanced, setAdvanced] = useState(false);
  const [formValues, setformValues] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    getOrgs(userEmail, match?.params?.ltiClientId);
    updateParams({
      ...params,
      ltiClientId: match.params.ltiClientId,
      userEmail,
      subjectIds: [],
      educationLevelIds: [],
      mode: 'search',
    });
  }, [match]);

  useEffect(() => {
    setformValues(params);
  }, [params]);

  useEffect(() => {
    const invalidFields = [];
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    if (formValues.start && formValues.start !== '') {
      const timestamp = Date.parse(formValues.start);
      if (isNaN(timestamp) || timestamp < 0 || timestamp > tomorrow) {
        invalidFields.push('start');
      }
    }

    if (formValues.end && formValues.end !== '') {
      const timestamp = Date.parse(formValues.end);
      if (isNaN(timestamp) || timestamp < 0 || timestamp > tomorrow) {
        invalidFields.push('end');
      }
    }

    setInvalidFields(invalidFields);
  }, [formValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateParams(formValues);
    showResults();
  };

  // const fieldChanged = (e) => {
  //   updateParams({
  //     ...params,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="row mt-2">
        <div className="col">
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              name="query"
              onChange={(e) => {
                setformValues({ ...formValues, query: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Shared / Private activities</label>
            <select
              className="form-control"
              name="private"
              onChange={(e) => {
                setformValues({ ...formValues, private: e.target.value });
              }}
            >
              <option className="option-1">Select all</option>
              <option value="0">Shared</option>
              <option value="1">Private</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Subject area</label>
            <select
              className="form-control"
              name="subjectIds"
              onChange={(e) => {
                if (formValues.subjectIds.indexOf(e.target.value) !== -1) return;

                setformValues({
                  ...formValues,
                  subjectIds: [...formValues.subjectIds, e.target.value],
                });
              }}
            >
              <option value="" disabled selected hidden>
                Subject Area
              </option>
              {subjects.map((data) => (
                <option key={data.value} value={data.subject}>
                  {data.subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {formValues.subjectIds?.length > 0 && (
        <div className="form-group wrap-keyword">
          {formValues.subjectIds.map((data) => (
            <div className="keywords-de">
              {data}
              <div
                className="iocns"
                onClick={() => {
                  setformValues({
                    ...formValues,
                    subjectIds: formValues.subjectIds.filter((index) => index !== data),
                  });
                }}
              >
                <FontAwesomeIcon icon="times" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Education level</label>
            <select
              className="form-control"
              name="educationLevelIds"
              onChange={(e) => {
                if (formValues.educationLevelIds.indexOf(e.target.value) !== -1) return;

                setformValues({
                  ...formValues,
                  educationLevelIds: [...formValues.educationLevelIds, e.target.value],
                });
              }}
            >
              <option value="" disabled selected hidden>
                Education Level
              </option>
              {educationLevels.map((data) => (
                <option key={data.value} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {formValues.educationLevelIds?.length > 0 && (
        <div className="form-group wrap-keyword">
          {formValues.educationLevelIds.map((data) => (
            <div className="keywords-de">
              {data}
              <div
                className="iocns"
                onClick={() => {
                  setformValues({
                    ...formValues,
                    educationLevelIds: formValues.educationLevelIds.filter((index) => index !== data),
                  });
                }}
              >
                <FontAwesomeIcon icon="times" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row">
        <div className="col">
          <div className="form-group">
            <select
              className="form-control"
              name="org"
              onChange={(e) => {
                setformValues({ ...formValues, org: e.target.value });
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Organization
              </option>
              {orgs.map((org) => (
                <option value={org.id} key={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {(invalidFields.indexOf('start') !== -1 || invalidFields.indexOf('end') !== -1) && <Alert variant="warning">Invalid date.</Alert>}
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>From</label>
            <input
              type="date"
              className="form-control"
              placeholder="From Date"
              name="start"
              onChange={(e) => {
                setformValues({ ...formValues, start: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>To</label>
            <input
              type="date"
              className="form-control"
              placeholder="To Date"
              name="end"
              onChange={(e) => {
                setformValues({ ...formValues, end: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      {params.private !== '1' && (
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Author</label>
              <div className="Author-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="author"
                  onChange={(e) => {
                    setformValues({ ...formValues, author: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/*<Form.Check type="switch" id="advancedSwitch" label="Advanced Search" checked={advanced} onChange={() => setAdvanced(!advanced)} />*/}
      <div className="row">
        <div className="col text-right">
          <div className="form-group search-btn">
            <img src={SearchImg} alt="logo" />
            <button className="btn btn-primary search-submit-button" type="submit" disabled={invalidFields.length > 0}>
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  match: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  orgs: PropTypes.array.isRequired,
  showResults: PropTypes.func.isRequired,
  updateParams: PropTypes.func.isRequired,
  getOrgs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  params: state.canvas.searchParams,
  orgs: state.organization.allOrganizations,
});

const mapDispatchToProps = (dispatch) => ({
  showResults: () => dispatch(showResultsAction()),
  updateParams: (params) => dispatch(updateParamsAction(params)),
  getOrgs: (userEmail, ltiClientId) => dispatch(getOrgsForDeepLinkingAction(userEmail, ltiClientId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
