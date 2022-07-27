/* eslint-disable */
import React, { useState, useEffect, useReducer } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FileUploadDnd from "components/FileInputDnd";

const UploadCoursePresentation = (props) => {
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <FileUploadDnd />
        </div>
      </div>
    </div>
  );
};

UploadCoursePresentation.propTypes = {

};

UploadCoursePresentation.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  
});

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadCoursePresentation));