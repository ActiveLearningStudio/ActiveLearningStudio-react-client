import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { browseAction } from 'store/actions/canvas';
import Project from 'containers/LMS/Canvas/DeepLinking/Project';
import gifloader from 'assets/images/dotsloader.gif';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import './style.scss';

const Browse = (props) => {
  const { match, browse, browseResults } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [primaryColor, setPrimaryColor] = useState(getGlobalColor('--main-primary-color'));

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(match.params.redirectUrl);

    if (params.has('platform') && params.get('platform') === 'msteams') {
      setPrimaryColor('#616161');
    }

    browse({
      lms_url: match.params.lmsUrl,
      lti_client_id: match.params.ltiClientId,
      user_email: params.get('user_email'),
      mode: 'browse',
      course_id: params.get('course_id'),
      api_domain_url: params.get('api_domain_url'),
      course_name: params.get('course_name'),
      search_keyword: searchQuery || null,
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
          {browseResults === null && (
            <div className="row">
              <div className="col text-center">
                <img style={{ width: '50px' }} src={gifloader} alt="" />
              </div>
            </div>
          )}
          {browseResults !== null && browseResults.length === 0 && <Alert className="mt-2" variant="warning">No projects found.</Alert>}
          {browseResults !== null && browseResults.length > 0 && browseResults.map((project) => <Project project={project} key={project.id} />)}
        </div>
      </div>
    </>
  );
};

Browse.defaultProps = {
  browseResults: null,
};

Browse.propTypes = {
  match: PropTypes.object.isRequired,
  browseResults: PropTypes.array,
  browse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  browseResults: state.canvas.browseResults,
});

const mapDispatchToProps = (dispatch) => ({
  browse: (params) => dispatch(browseAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Browse));
