/*eslint-disable*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileUploadDnd from "components/FileInputDnd";

const H5PImageUploadMyDevice = (props) => {
  const {
    uploadHandler,
  } = props;

  return (
    <div>
      <FileUploadDnd handleChange={uploadHandler}/>
    </div>
  );

};

H5PImageUploadMyDevice.propTypes = {
};

H5PImageUploadMyDevice.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PImageUploadMyDevice));