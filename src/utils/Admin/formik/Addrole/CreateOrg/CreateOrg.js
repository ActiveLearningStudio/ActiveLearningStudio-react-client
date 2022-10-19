/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import createorg from './createOrg.png';
import CreateOrgSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createOrg';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
export const CreateOrg = () => {
  return (
    <>
      <Tabview
        componentName="Createorg"
        path="/src/containers/Admin/formik/createOrg.js"
        description="In create Org component, you can create a new organization by filling a form with some data.
    In create Org form, you have to enter the organization name, upload an image of the organization as
    a thumbnail, enter the description and domain. After putting this information you can click on Create organization.
    After all of this, your created organization will reflect on the dashboard."
        codeSnippet={CreateOrgSnippet}
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
        images={createorg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
