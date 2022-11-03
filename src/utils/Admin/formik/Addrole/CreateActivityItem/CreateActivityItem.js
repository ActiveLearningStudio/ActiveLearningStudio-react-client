/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import ActivityItemimg from './addActivityItem.png';
import ActivityItemSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createActivityItem';
import CreateActivityStoreCode from '!!raw-loader!../../../../../store/actions/resource';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateActivityItem = () => {
  return (
    <>
      <Tabview
        componentName="Create Activity Item"
        path="/src/containers/Admin/formik/createActivityItem.js"
        description="In create an activity item, you have a form to add a new activity item where you will enter your title, description, upload image, and select activity type from the dropdown list. when you will enter all these details then you have to click on submit button. Then your activity type will be created."
        codeSnippet={ActivityItemSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'prop-types']}
        customHooks={[]}
        reduxStore={[
          {
            path: '/src/store/actions/resource',
            pathCode: CreateActivityStoreCode,
          },
        ]}
        apiUsed={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={ActivityItemimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
