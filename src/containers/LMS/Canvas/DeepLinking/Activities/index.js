import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getActivitiesAction } from 'store/actions/canvas';
import ActivitiesList from 'containers/LMS/Canvas/DeepLinking/ActivitiesList';
import gifloader from 'assets/images/dotsloader.gif';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import './style.scss';

const Activities = (props) => {
  const { match, browse, activities } = props;
  const primaryColor = getGlobalColor('--main-primary-color');
  const [searchQuery, setSearchQuery] = useState('');

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const url = new URL(window.location.href);
    const email = url.searchParams.get('user_email');
    browse({
      user_email: email,
      query: searchQuery || null,
      size: null,
      lti_client_id: match.params.ltiClientId,
    });
  }, [match, searchQuery]);

  return (
    <>
      <div className="top-search-filter">
        <div className="search-bar">
          <input
            className=""
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery(searchQuery)}>
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {activities === null && (
            <div className="row">
              <div className="col text-center">
                <img style={{ width: '50px' }} src={gifloader} alt="" />
              </div>
            </div>
          )}
          {activities !== null && activities.data.length === 0 && <Alert variant="warning">No activity found.</Alert>}
          {activities !== null && activities.data.length > 0 && activities.data.map((data) => <ActivitiesList activity={data} key={data.id} />)}
        </div>
      </div>
    </>
  );
};

Activities.defaultProps = {
  activities: null,
};

Activities.propTypes = {
  match: PropTypes.object.isRequired,
  activities: PropTypes.array,
  browse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activities: state.canvas.activities,
});

const mapDispatchToProps = (dispatch) => ({
  browse: (params) => dispatch(getActivitiesAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activities));
