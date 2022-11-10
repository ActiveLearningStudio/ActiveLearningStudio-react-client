/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import createActivityimg from './addActivity.png';
import CreateActivitySnippet from '!!raw-loader!../../../../../containers/Admin/formik/createActivity';
import CreateActivityStoreCode from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateActivity = () => {
  return (
    <>
      <Tabview
        componentName="Create Activity"
        path="/src/containers/Admin/formik/createActivity.js"
        description="This is the component of creating a new activity. In this component, you can create a new activity by submitting a form where you will enter the title of the activity, upload the image, and order the activity.  After submitting the form, click on the create new activity button. In this way, your new activity will be created."
        codeSnippet={CreateActivitySnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: '/src/store/actions/admin',
            pathCode: CreateActivityStoreCode,
          },
        ]}
        apiUsed={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={createActivityimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
