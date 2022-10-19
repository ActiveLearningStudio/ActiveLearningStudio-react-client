/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import LayoutImg from './layoutImg.png';
import CreateLtiSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createActivityLayout';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
import ApiSnippet from '!!raw-loader!../../../../../services/admin.service';
export const CreateActivityLayout = () => {
  return (
    <>
      <Tabview
        componentName="CreateActivityLayout"
        path="src/containers/Admin/formik/createActivityLayout.js"
        description="In create activity layout component, you can create a new organization by filling a form with some data.
        In activity layout, you have to enter the title name, upload an image of the organization as
        a thumbnail, enter the description and category. After putting this information you can click on save organization.
        After all of this, your created organization will reflect on the dashboard."
        codeSnippet={CreateLtiSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: '/src/store/actions/admin',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiSnippet }]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={LayoutImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
