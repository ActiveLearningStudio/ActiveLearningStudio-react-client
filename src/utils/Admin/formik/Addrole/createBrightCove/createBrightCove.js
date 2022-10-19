/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import CreateBrightImg from './createBrightImg.png';
import CreateBrightCoveSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createBrightCove';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateBrightCove = () => {
  return (
    <>
      <Tabview
        componentName="CreateBrightCove"
        path="/src/containers/Admin/formik/createBrightCove.js"
        description="In create bright cove component, you can create a new organization by filling a form with some data.
    In create bright form, you have to enter the organization name, upload an image of the organization as
    a thumbnail, enter the description and domain. After putting this information you can click on Create organization.
    After all of this, your created organization will reflect on the dashboard."
        codeSnippet={CreateBrightCoveSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: '/src/store/actions/admin',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={CreateBrightImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
