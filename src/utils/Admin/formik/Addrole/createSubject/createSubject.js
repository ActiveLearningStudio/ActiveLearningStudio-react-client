/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import SubjectImg from './subjectImg.png';
import CreateLtiSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createSubject';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
import ApiSnippet from '!!raw-loader!../../../../../services/admin.service';
export const CreateSubject = () => {
  return (
    <>
      <Tabview
        componentName="CreateSubject"
        path="/src/containers/Admin/formik/createSubject.js"
        description="In create subject component, you can add a new subject.
    In create subject form, you have to enter the organization name, enter the order. After putting this information you can click on save organization.
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
        images={SubjectImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
