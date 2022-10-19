/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import createLms from './createLms.png';
import CreateLmsSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createLms';
import CreateLmsApi from '!!raw-loader!../../../../../services/admin.service';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateLms = () => {
  return (
    <>
      <Tabview
        componentName="Create Lms"
        path="/src/containers/Admin/formik/createLms.js"
        description="This is the component of creating the LMS setting. In this component, you will see the form for creating the LMS setting. when you click on the LMS setting button, you will get a form, where you will put information related to the site name, LMS Access token, access key, secret key, description, etc
        After filling the form you have to submit the create Lms setting form and then your LMS will be created."
        codeSnippet={CreateLmsSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'prop-types', 'swal', 'react-switch']}
        customHooks={[{ name: 'src/components/ResourceCard/AddResource/dropdownData', url: '' }]}
        reduxStore={[
          {
            path: 'src/store/actions/admin',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[
          {
            path: 'src/services/admin.service',
            apicode: CreateLmsApi,
          },
        ]}
        images={createLms}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
