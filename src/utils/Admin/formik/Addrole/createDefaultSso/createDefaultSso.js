/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import IntegrationImg from './integrationImg.png';
import CreateLtiSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createDefaultSso';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
import ApiSnippet from '!!raw-loader!../../../../../services/admin.service';
export const CreateDefaultSso = () => {
  return (
    <>
      <Tabview
        componentName="CreateDefaultSso"
        path="/src/containers/Admin/formik/createDefaultSso.js"
        description="In create Default Sso component, you can create a new organization by filling a form with some data.
        In create Default Sso, you have to enter the add Lms url, and also access the token of Lms setting, enter the description and user also you can put the access key, secret key. After putting this information you can click on save organization.
        After all of this, your created organization will reflect on the dashboard."
        codeSnippet={CreateLtiSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: 'src/store/actions/admin',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiSnippet }]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={IntegrationImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
