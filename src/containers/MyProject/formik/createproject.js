/*eslint-disable*/
import { Formik } from 'formik';
import React, { setState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import InputLabel from 'utils/InputLabel/inputlabel';
import InputTextField from 'utils/InputTextField/inputtextfield';
import UploadImage from 'utils/UploadImage/uploadimage';

const MyProjectsCreate = ({ setUploadImageStatus }) => {
  return (
    <div className="myproject-layout">
      <div className="myproject-layout-title">
        <HeadingTwo text="Create a project" color="#084892" />
      </div>
      <div className="myproject-layout-formik">
        <Formik>
          <form>
            <div className="layout-formik-input">
              <InputLabel text="Project Name" className="input-label">
                <InputTextField placeholder="e.g Course Name" className="input-field" />
              </InputLabel>
            </div>
            <div className="layout-formik-input">
              <InputLabel text="What is your project about?" className="input-label">
                <InputTextField placeholder="Write a brief description of your project" className="input-field" />
              </InputLabel>
            </div>
            <div className="layout-formik-input">
              <InputLabel text="Visibility type" className="input-label">
                <select>
                  <option>Private</option>
                </select>
              </InputLabel>
            </div>
            <div className="layout-formik-uploadimage">
              <UploadImage setUploadImageStatus={setUploadImageStatus} />
            </div>
          </form>
        </Formik>
      </div>
      <div className="myproject-button">
        <Buttons text="Create Project" primary={true} width="189px" height="43px" hover={true} />
      </div>
    </div>
  );
};

export default MyProjectsCreate;
