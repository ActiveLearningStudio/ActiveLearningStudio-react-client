/*eslint-disable*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const H5PImageUploadPexels = (props) => {
  const {
    uploadHandler,
  } = props;

  return (
    <div>
      Pexels content
    </div>
  );

};

H5PImageUploadPexels.propTypes = {
};

H5PImageUploadPexels.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PImageUploadPexels));