/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import CreateLtiImg from './createLtiImg.png';
import CreateLtiSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createLtiTool';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
import ApiSnippet from '!!raw-loader!../../../../../services/admin.service';
export const CreateLtiTool = () => {
  return (
    <>
      <Tabview
        componentName="CreateLtiTool"
        path="/src/containers/Admin/formik/createLtiTool.js"
        description="In create Lti Tool component, you can create a new organization by filling a form with some data.
    In create Lti form, you have to enter the organization name, enter the description and domain. After putting this information you can click on save organization.
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
        images={CreateLtiImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
