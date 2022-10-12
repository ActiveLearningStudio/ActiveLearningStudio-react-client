/*eslint-disable*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const H5PImageUploadSmithsonian = (props) => {
  const {
    uploadHandler,
  } = props;

  return (
    <div>
      Smithsonian content
    </div>
  );

};

H5PImageUploadSmithsonian.propTypes = {
};

H5PImageUploadSmithsonian.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PImageUploadSmithsonian));