/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import CreateUserimg from './createUser.png';
import CreateUserSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createuser';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/organization';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateUser = () => {
  return (
    <>
      <Tabview
        componentName="CreateUser"
        path="src/containers/Admin/formik/createuser.js"
        description="This is the component for creating a new user. In this form, you will find some necessary
    information to fill for creating a new user, when you will fill the form with necessary details
    like user name, email, password organization name, etc. then you have to submit this form. In this way
    you will create a new user for using the curriki studio account."
        codeSnippet={CreateUserSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: 'src/store/actions/organization',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={CreateUserimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
