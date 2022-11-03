/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import EducationImg from './educationImg.png';
import CreateLtiSnippet from '!!raw-loader!../../../../../containers/Admin/formik/createEducationLevel';
import CreateLmsStore from '!!raw-loader!../../../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../../../containers/Admin/style.scss';
import ApiSnippet from '!!raw-loader!../../../../../services/admin.service';
export const CreateEducationLevel = () => {
  return (
    <>
      <Tabview
        componentName="CreateEducationLevel"
        path="/src/containers/Admin/formik/createEducationLevel.js"
        description="In create education level component, you can add a new education level.
    In education level form, you have to enter the organization name, enter the order. After putting this information you can click on save organization.
    After all of this, your created organization will reflect on the dashboard."
        codeSnippet={CreateLtiSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[{ name: '/src/components/ResourceCard/AddResource/dropdownData', url: '' }]}
        reduxStore={[
          {
            path: '/src/store/actions/admin',
            pathCode: CreateLmsStore,
          },
        ]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiSnippet }]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={EducationImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
