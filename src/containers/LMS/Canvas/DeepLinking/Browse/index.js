import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { browseAction } from 'store/actions/canvas';
import Project from 'containers/LMS/Canvas/DeepLinking/Project';
import gifloader from 'assets/images/dotsloader.gif';
// import './style.scss';

const Browse = (props) => {
  const {
    match,
    browse,
    browseResults,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const url = new URL(window.location.href);
    const email = url.searchParams.get('user_email');
    browse({
      lms_url: match.params.lmsUrl,
      lti_client_id: match.params.ltiClientId,
      user_email: email,
      mode: 'browse',
    });
  }, [match]);

  return (
    <div className="row">
      <div className="col">
        {browseResults === null && (
          <div className="row">
            <div className="col text-center">
              <img style={{ width: '50px' }} src={gifloader} alt="" />
            </div>
          </div>
        )}
        {browseResults !== null && browseResults.length === 0 && (
          <Alert variant="warning">
            No projects found.
          </Alert>
        )}
        {browseResults !== null && browseResults.length > 0 && browseResults.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    </div>
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
