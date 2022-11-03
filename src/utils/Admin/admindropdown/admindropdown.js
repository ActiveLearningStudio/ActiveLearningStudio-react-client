/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/adminDropdown';
import dropdown from './dropdown.png';
import UserRoleStore from '!!raw-loader!../../../store/actions/videos';
import Apicode from '!!raw-loader!../../../services/project.service';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Admindropdown = () => {
  return (
    <>
      <Tabview
        componentName="Admin Dropdown"
        path="\src\containers\Admin\adminDropdown.js"
        description="In the admin dropdown component, you will handle dropdown menu in each table in admin panel. If you go to the each table and click on ellipses in the table then you will see the edit, delete and clone button. So all these functionality are handled through this component"
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/videos', pathCode: UserRoleStore }]}
        apiUsed={[{ path: '/src/services/project.service', apicode: Apicode }]}
        images={dropdown}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
