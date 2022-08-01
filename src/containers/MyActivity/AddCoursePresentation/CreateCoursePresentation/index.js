/* eslint-disable */
import React from 'react';
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const CreateCoursePresentation = () => {
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

export default CreateCoursePresentation;
