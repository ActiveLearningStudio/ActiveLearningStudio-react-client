/* eslint-disable */
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import btnLogo from 'assets/images/googleBtnLogo.png';
import axios from 'axios';
import TabsHeading from "utils/Tabs/tabs";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { Tabs, Tab, Alert } from "react-bootstrap";
import HeadingThree from "utils/HeadingThree/headingthree";

const CreateCoursePresentation = (props) => {
  const primaryColor = getGlobalColor("--main-primary-color");
  
  return (
    <div>
      <h3 style={{color: primaryColor, 'font-size': '1.25rem'}}>
        Start with a blank template
      </h3>
      <p>
        Add multiple interactions into a slide presentation
      </p>
    </div>
  );
};

CreateCoursePresentation.propTypes = {

};

CreateCoursePresentation.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  
});

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCoursePresentation));
